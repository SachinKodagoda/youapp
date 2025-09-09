"use client";

import { cn } from "@/utils/cn";
import PlusIcon from "@assets/images/plus-icon.svg";
import { AlertCircleIcon } from "lucide-react";
import Image from "next/image";
import * as React from "react";
import { useDropzone } from "react-dropzone";
import { ProgressCircle } from "./progress-circle";
import { formatFileSize, useUploader } from "./uploader-provider";

const DROPZONE_VARIANTS = {
  accept: "border-blue-500 dark:border-blue-400 bg-blue-100 dark:bg-blue-900/30",
  active: "border-blue-500 dark:border-blue-400",
  base: "relative rounded-md p-4 flex justify-center items-center flex-col cursor-pointer min-h-[60px] min-w-[60px] transition-colors duration-200 ease-in-out",
  disabled:
    "bg-gray-100/50 dark:bg-gray-800/50 border-gray-400/50 dark:border-gray-600/50 cursor-default pointer-events-none",
  image: "border-0 p-0 min-h-0 min-w-0 relative bg-gray-100 dark:bg-gray-800 shadow-md",
  reject: "border-red-500 dark:border-red-400 bg-red-100 dark:bg-red-900/30",
};

export interface SingleImageDropzoneProps extends React.HTMLAttributes<HTMLInputElement> {
  disabled?: boolean;
}

const SingleImageDropzone = React.forwardRef<HTMLInputElement, SingleImageDropzoneProps>(
  ({ className, disabled, ...props }, ref) => {
    const { addFiles, fileStates, removeFile } = useUploader();
    const [error, setError] = React.useState<string>();

    const fileState = React.useMemo(() => fileStates[0], [fileStates]);
    const maxSize = 1024 * 1024 * 5; // 5 MB

    // Create temporary URL for image preview before upload is complete
    const tempUrl = React.useMemo(() => {
      if (fileState?.file) {
        return URL.createObjectURL(fileState.file);
      }
      return null;
    }, [fileState]);

    // Clean up temporary URL to prevent memory leaks
    React.useEffect(() => {
      return () => {
        if (tempUrl) {
          URL.revokeObjectURL(tempUrl);
        }
      };
    }, [tempUrl]);

    const displayUrl = tempUrl ?? fileState?.url;
    const isDisabled =
      !!disabled || fileState?.status === "UPLOADING" || fileState?.status === "COMPLETE"; // Disable when upload complete

    const { getInputProps, getRootProps, isDragAccept, isDragReject, isFocused } = useDropzone({
      accept: { "image/*": [] },
      disabled: isDisabled,
      multiple: false,
      onDrop: (acceptedFiles, rejectedFiles) => {
        setError(undefined);
        // Handle rejections first
        if (rejectedFiles.length > 0) {
          if (rejectedFiles[0]?.errors[0]) {
            const error = rejectedFiles[0].errors[0];
            const code = error.code;

            // User-friendly error messages
            const messages: Record<string, string> = {
              default: "The file is not supported.",
              "file-invalid-type": "Invalid file type.",
              "file-too-large": `The file is too large. Max size is ${formatFileSize(
                maxSize ?? 0,
              )}.`,
              "too-many-files": "You can only upload one file.",
            };
            setError(messages[code] ?? messages.default);
          }
          return; // Exit early if there are any rejections
        }

        // Handle accepted files only if there are no rejections
        if (acceptedFiles.length > 0) {
          // Remove existing file before adding a new one
          if (fileStates[0]) {
            removeFile(fileStates[0].key);
          }
          addFiles(acceptedFiles);
        }
      },
    });

    const dropZoneClassName = React.useMemo(
      () =>
        cn(
          DROPZONE_VARIANTS.base,
          isFocused && DROPZONE_VARIANTS.active,
          isDisabled && DROPZONE_VARIANTS.disabled,
          displayUrl && DROPZONE_VARIANTS.image,
          isDragReject && DROPZONE_VARIANTS.reject,
          isDragAccept && DROPZONE_VARIANTS.accept,
          className,
        ),
      [isFocused, isDisabled, displayUrl, isDragAccept, isDragReject, className],
    );

    // Combined error message from dropzone or file state
    const errorMessage = error ?? fileState?.error;

    return (
      <div className="flex flex-col items-center">
        <div
          {...getRootProps({
            className: dropZoneClassName,
            style: {
              height: "60px",
              width: "60px",
            },
          })}
        >
          <input ref={ref} {...getInputProps()} {...props} />

          {displayUrl ? (
            <Image
              className="h-[57px] w-[57px] rounded-md object-cover"
              width={57}
              height={57}
              src={displayUrl}
              alt={fileState?.file.name ?? "uploaded image"}
            />
          ) : (
            // Placeholder content shown when no image is selected
            <>
              <div
                className={cn(
                  "flex h-[57px] w-[57px] flex-none items-center justify-center rounded-[17px] bg-white/[0.08]",
                  isDisabled && "opacity-50",
                )}
              >
                <Image src={PlusIcon} width={20} height={20} alt="plus icon" />
              </div>
            </>
          )}

          {/* Upload progress overlay */}
          {displayUrl && fileState?.status === "UPLOADING" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center rounded-md bg-black/70">
              <ProgressCircle progress={fileState.progress} />
            </div>
          )}
        </div>

        {/* Error message display */}
        {errorMessage && (
          <div className="mt-2 flex items-center text-xs text-red-500 dark:text-red-400">
            <AlertCircleIcon className="mr-1 h-4 w-4" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>
    );
  },
);
SingleImageDropzone.displayName = "SingleImageDropzone";

export { SingleImageDropzone };
