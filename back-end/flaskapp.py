import flask
from SwinIR import main_test_swinir
from flask import Flask, request
import shutil
import os

app = Flask(__name__)

@app.route('/SwinIR', methods=['POST'])
def swinIR_API():
    body=request.form
    #selecting between small and large model.
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
    # applying None value incase of no selection or None string value.
        if(body.get('tile')!='None'):
            tile=int(body.get('tile'))
        else:
            tile=None
        #to-do erase directory images if exists 
        f = request.files['image']
        f.save(dst_path)
    except Exception as error:
        print(error)
        return error,400
    main_test_swinir.main(body.get('task'),int(body.get('scale')),int(body.get('noise')),int(body.get('jpeg')),int(body.get('training_path_size')),large_model,model_path,upload_folder,None,tile,int(body.get('tile_overlap')))    

    return "Success"

 
 
if __name__ == '__main__':
    app.run(debug=True)