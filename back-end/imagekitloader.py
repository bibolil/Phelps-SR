from imagekitio import ImageKit
imagekit = ImageKit(
    private_key='private_kUJhKvRhCn5khrW6cH6oFC85/bE=',
    public_key='public_nDkkJ0XveuHGU7nBHHCFEed1iaU=',
    url_endpoint = 'https://ik.imagekit.io/SR/'
)
list_images=[]
def load_images():
    images = imagekit.list_files()
    for i in images.response_metadata.raw:
        list_images.append([i['fileId'],i['url'],i['createdAt']])
    return list_images   


if __name__ == '__main__':
    load_images()


