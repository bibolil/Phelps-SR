import flask
from flask_cors import CORS
from flask import send_file
from SwinIR import main_test_swinir
from flask import Flask, request
import shutil
import os
from imagekitio import ImageKit
import base64
import sys
import io

def image_to_base64(image_path):
    with open(image_path, "rb") as image_file:
        base64_data = base64.b64encode(image_file.read())
        base64_string = base64_data.decode("utf-8")
        return base64_string


sys.path.append('yolo')
from yolo import yolov8


app = Flask(__name__)
app.config['TEMPLATES_AUTO_RELOAD'] = True
CORS(app)
imagekit = ImageKit(
    private_key='private_kUJhKvRhCn5khrW6cH6oFC85/bE=',
    public_key='public_nDkkJ0XveuHGU7nBHHCFEed1iaU=',
    url_endpoint = 'https://ik.imagekit.io/SR/'
)

@app.route('/SwinIR_multi_images', methods=['GET', 'POST'])
def swinIR_multi_images():
    response={}
    upload_folder = 'inputs'
    result_folder = 'results'
    if os.path.isdir(upload_folder):
            shutil.rmtree(upload_folder)
    if os.path.isdir(result_folder):
            shutil.rmtree(result_folder)
    os.mkdir(upload_folder)
    os.mkdir(result_folder)
    for index, base64_string in request.form.items():
        dst_path = os.path.join(upload_folder,'image'+index+'.jpg')
        base64_code=base64_string.split(",", 1)[1]
        decoded_image = base64.b64decode(base64_code)
        image = io.BytesIO(decoded_image)
        with open(dst_path, "wb") as f:
            f.write(image.read())
            f.close()
    model_path='experiments/pretrained_models/003_realSR_BSRGAN_DFO_s64w8_SwinIR-M_x4_GAN.pth'
    large_model=False
    tile=None
    main_test_swinir.main('real_sr',4,15,40,128,large_model,model_path,upload_folder,None,tile,32)
    result_path="results/swinir_real_sr_x4"
    image_files = os.listdir(result_path)
    for image_file in image_files:
        try:
            upload = imagekit.upload_file(
                file=image_to_base64(result_path+'/'+image_file),
                file_name=image_file,
            ) 
        except Exception as error:  
            print(error)
        response[image_file]=upload.response_metadata.raw["url"]
    print(response)
    return response

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
    url="results/swinir_real_sr_x4/image_SwinIR.png"
    filename = "image_SwinIR.png"
    try:
        upload = imagekit.upload_file(
            file=image_to_base64(url),
            file_name=filename,
        ) 
    except Exception as error:  
        print(error)
    return { 'Status' : 'Success','url':upload.response_metadata.raw["url"]}

@app.route('/ImageKIT', methods=['GET'])
def imageKIT_API():
    keys=['id','imagePath','creationtime','thumbnail']
    list_images=[]
    images = imagekit.list_files()
    for i in images.response_metadata.raw:
        list_images.append(dict(zip(keys, [i['fileId'],i['url'],i['createdAt'],i['thumbnail']])))
    return list_images


@app.route('/YOLO',methods=['GET','POST'])
def cropper():
    #To do make this folder making in an outsider function used in SwinIR_API and cropper functions
    img=request.files['image']
    upload_folder = 'inputs'
    result_folder = 'results'
    if os.path.isdir(upload_folder):
            shutil.rmtree(upload_folder)
    if os.path.isdir(result_folder):
            shutil.rmtree(result_folder)
    os.mkdir(upload_folder)
    os.mkdir(result_folder)
    dst_path = os.path.join(upload_folder,'image_yolo.png')
    img.save(dst_path)
    crops=yolov8.cropper(dst_path)
    return crops
    

if __name__ == '__main__':
    app.run(debug=True)