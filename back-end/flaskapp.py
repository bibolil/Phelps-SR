import flask
from flask_cors import CORS
from flask import send_file
from SwinIR import main_test_swinir
from flask import Flask, request
import shutil
import os
import jsonify
from PIL import Image
import io
from base64 import encodebytes

app = Flask(__name__)
CORS(app)

def get_response_image(image_path):
    pil_img = Image.open(image_path, mode='r') # reads the PIL image
    byte_arr = io.BytesIO()
    pil_img.save(byte_arr, format='PNG') # convert the PIL image to byte array
    encoded_img = encodebytes(byte_arr.getvalue()).decode('ascii') # encode as base64
    return encoded_img

@app.route('/SwinIR', methods=['GET', 'POST'])
def swinIR_API():
    body=request.form
    upload_folder = 'inputs'
    result_folder = 'results'
    if os.path.isdir(upload_folder):
            shutil.rmtree(upload_folder)
    if os.path.isdir(result_folder):
            shutil.rmtree(result_folder)
    os.mkdir(upload_folder)
    os.mkdir(result_folder)
    dst_path = os.path.join(upload_folder,'image.jpg')
    
    try:
        model_path='experiments/pretrained_models/003_realSR_BSRGAN_DFO_s64w8_SwinIR-M_x4_GAN.pth'
        large_model=False
        if(body.get('tile')!='None'):
            tile=int(body.get('tile'))
        else:
            tile=None
        f = request.files['image']
        f.save(dst_path)
    except Exception as error:
        print(error)
        return error,400
    main_test_swinir.main(body.get('task'),int(body.get('scale')),int(body.get('noise')),int(body.get('jpeg')),int(body.get('training_path_size')),large_model,model_path,upload_folder,None,tile,int(body.get('tile_overlap')))
    filename="results/swinir_real_sr_x4/image_SwinIR.png" 
    encoded_img = get_response_image(filename)
    
    return { 'Status' : 'Success', 'ImageBytes': encoded_img}


# def heros():
#     return {"name": "SwinIR"}
 
if __name__ == '__main__':
    app.run(debug=True)