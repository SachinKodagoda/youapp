"use client";
import { useEdgeStore } from "@/lib/edgestore";
import { useCallback } from "react";
import { SingleImageDropzone } from "./elements/single-image-dropzone";
import { UploaderProvider, type UploadFn } from "./elements/uploader-provider";

type TProps = {
  onUpload: (url: string | null) => void;
};

export default function AddImage({ onUpload }: TProps) {
  const { edgestore } = useEdgeStore();

  const uploadFn: UploadFn = useCallback(
    async ({ file, onProgressChange, signal }) => {
      const res = await edgestore.publicFiles.upload({
        file,
        onProgressChange,
        signal,
      });
      onUpload(res.url || null);
      return res;
    },
    [edgestore.publicFiles, onUpload],
  );

  return (
    <div className="flex items-center gap-4">
      <UploaderProvider uploadFn={uploadFn} autoUpload>
        <SingleImageDropzone />
      </UploaderProvider>
      <div className="text-xs font-[500]">Add image</div>
    </div>
  );
}
