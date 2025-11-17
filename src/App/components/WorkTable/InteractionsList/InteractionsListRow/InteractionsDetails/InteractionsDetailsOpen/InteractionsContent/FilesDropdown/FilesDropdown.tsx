import React from "react";
import icons from "../../../../../icons";
import { FilesData } from "../../../../../InteractionsListTypes";

interface FilesDropdownProps {
  files: FilesData[];
  onDownload: (file: FilesData) => void;
  onClose: () => void;
}

function FilesDropdown({ files, onDownload, onClose }: FilesDropdownProps) {
  return (
    <div className="files-dropdown">
      {files.map((file) => (
        <div
          key={file.id}
          className="files-dropdown__item"
          onClick={() => onDownload(file)}
        >
          <span className="files-dropdown__name" title={file.nameFiles}>
            {file.nameFiles}
          </span>
          <span className="files-dropdown__icon">{icons.download24Icon}</span>
        </div>
      ))}
    </div>
  );
}

export default FilesDropdown;
