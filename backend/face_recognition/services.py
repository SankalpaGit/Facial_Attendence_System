import cv2
import numpy as np
import face_recognition
import tempfile
import os

def _extract_encodings_from_video_file(video_path, sample_every_n_frames=5, max_encodings_per_video=4):
    """
    Read video, sample frames, extract first face encoding per sampled frame.
    Returns list of encodings (numpy arrays).
    """
    encodings = []
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        cap.release()
        return encodings

    frame_index = 0
    while True:
        ret, frame = cap.read()
        if not ret:
            break

        if frame_index % sample_every_n_frames == 0:
            # convert BGR (OpenCV) to RGB (face_recognition)
            rgb = frame[:, :, ::-1]
            # detect & encode
            faces = face_recognition.face_encodings(rgb)
            if faces:
                encodings.append(faces[0])
                if len(encodings) >= max_encodings_per_video:
                    break
        frame_index += 1

    cap.release()
    return encodings


def process_three_profile_videos(front_file, left_file, right_file):
    """
    Accepts Django UploadedFile objects for front/left/right profile videos.
    Returns averaged embedding (list of floats) or raises ValueError on failure.
    """
    tmp_files = []
    try:
        uploaded = [front_file, left_file, right_file]
        all_encodings = []

        for upload in uploaded:
            if upload is None:
                continue
            # write to temp file
            suffix = os.path.splitext(upload.name)[1] or ".mp4"
            tmp = tempfile.NamedTemporaryFile(delete=False, suffix=suffix)
            tmp_files.append(tmp.name)
            for chunk in upload.chunks():
                tmp.write(chunk)
            tmp.flush()
            tmp.close()

            encs = _extract_encodings_from_video_file(tmp.name, sample_every_n_frames=6, max_encodings_per_video=3)
            if encs:
                all_encodings.extend(encs)

        if not all_encodings:
            raise ValueError("No face encodings found in any of the uploaded videos. Ensure videos show a clear face.")

        # average encodings into single representative vector
        mean_encoding = np.mean(np.stack(all_encodings, axis=0), axis=0)
        return mean_encoding.tolist()

    finally:
        # cleanup temporary files
        for f in tmp_files:
            try:
                os.remove(f)
            except Exception:
                pass
