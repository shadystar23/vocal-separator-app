import firebase_admin
from firebase_admin import credentials, storage
import os

# تأكد من وجود ملف json لشهادة Firebase
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred, {
    'storageBucket': 'your-firebase-bucket-name.appspot.com'
})

def upload_to_firebase(file_path):
    bucket = storage.bucket()
    blob = bucket.blob(f"processed/{os.path.basename(file_path)}")
    blob.upload_from_filename(file_path)
    blob.make_public()
    return blob.public_url