from flask  import Flask, request, jsonify, render_template,send_file
import io 
app = Flask(__name__, static_folder='static', template_folder='templates')
CONST_PASSWORD='khoimomxdz'

@app.route('/')
def index():
    return render_template('ui.html')


def xor_encrypt(data, key):
    encode_char='@#$&*(%^!_+~.<>?/;:'
    result=[]
    for i,c in enumerate(data):
        xor_val = ord(c) ^ ord(key[i % len(key)])
        result.append(encode_char[xor_val % len(encode_char)])
    
    return ''.join(result)
@app.route('/encode', methods=['POST'])
def encode():
    password=request.form.get('password')
    if password != CONST_PASSWORD:
        return jsonify({'error': 'Unauthorized'})
    file = request.files['file']
    content = file.read().decode('utf-8', errors='ignore')
    encoded= xor_encrypt(content,CONST_PASSWORD)
    
    return jsonify({'encoded_content': encoded})


@app.route('/download', methods=['POST'])
def download():
    data = request.get_json()
    buf  = io.BytesIO(data['content'].encode('utf-8'))
    buf.seek(0)
    return send_file(buf, as_attachment=True,
                     download_name=data['filename'],
                     mimetype='text/plain')

if __name__ == '__main__':
    app.run(debug=True, port=5500)
