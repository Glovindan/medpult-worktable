// FileUploader.tsx
import React from "react";
import icons from "../../icons";

interface FileUploaderProps {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

export default function FileUploader({ files, setFiles }: FileUploaderProps) {
  return ( 
    <>
      <div
        className="files-uploader"
        onDragOver={(e) => {
          e.preventDefault();
          e.currentTarget.classList.add("drag-active");
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          e.currentTarget.classList.remove("drag-active");
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.currentTarget.classList.remove("drag-active");
          const droppedFiles = Array.from(e.dataTransfer.files);
          setFiles((prev) => [...prev, ...droppedFiles]);
        }}
      >
        <input
          type="file"
          multiple
          id="email-files"
          className="files-uploader__input"
          onChange={(e) => {
            const selected = Array.from(e.target.files || []);
            setFiles((prev) => [...prev, ...selected]);
          }}
        />

        <span className="files-uploader__upload">
          {icons.fileEmailModal}
          Перетащите файл для загрузки или{" "}
          <span
            className="files-uploader__upload__link"
            onClick={() => document.getElementById("email-files")?.click()}
          >
            обзор файлов
          </span>
        </span>
      </div>

      {/* Список файлов */}
      {files.length > 0 && (
        <div className="files-uploader__list">
          {files.map((file, i) => (
            <div key={i} className="files-uploader__list__item">
              <span>{file.name}</span>
              <span
                className="files-uploader__list__delete"
                onClick={() =>
                  setFiles((prev) => prev.filter((_, index) => index !== i))
                }
              >
                {icons.Wastebasket}
              </span>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
