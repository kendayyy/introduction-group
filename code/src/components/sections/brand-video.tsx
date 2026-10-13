"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import type { Dictionary } from "@/i18n/dictionary";

const videoSrc = "/media/brand-video.mp4";

export function BrandVideo({ dictionary }: { dictionary: Dictionary }) {
  const [open, setOpen] = useState(false);
  const [paused, setPaused] = useState(false);

  return (
    <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)] md:items-center">
      <button
        type="button"
        className="bg-ink relative block min-h-56 w-full min-w-0 overflow-hidden text-left text-white"
        onClick={() => setOpen(true)}
      >
        <Image
          src="/media/placeholder-poster.svg"
          alt=""
          width={1600}
          height={900}
          unoptimized
          className="h-72 w-full object-cover"
        />
        <span className="bg-ink absolute bottom-4 left-4 px-4 py-2">
          {dictionary.playVideo}
        </span>
      </button>
      <p>{dictionary.videoUnavailable}</p>
      {open ? (
        <Modal
          title={dictionary.playVideo}
          closeLabel={dictionary.closeVideo}
          onClose={() => setOpen(false)}
        >
          <video
            src={videoSrc}
            poster="/media/placeholder-poster.svg"
            controls
            className="aspect-video w-full"
            data-video-source={videoSrc}
          >
            <track
              kind="captions"
              src="/media/brand-video.vtt"
              srcLang="vi"
              label={dictionary.captions}
              default
            />
          </video>
          <div className="mt-4 flex gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                const video = document.querySelector("video");
                if (!video) {
                  return;
                }
                if (video.paused) {
                  void video.play();
                  setPaused(false);
                } else {
                  video.pause();
                  setPaused(true);
                }
              }}
            >
              {paused ? dictionary.playVideo : dictionary.pauseVideo}
            </Button>
          </div>
          <h3 className="mt-4 text-lg">{dictionary.transcript}</h3>
          <p>
            Web2Go giới thiệu cổng thông tin, hệ thống nghiệp vụ và dịch vụ vận
            hành số. Video không tự phát. Phụ đề tiếng Việt đi kèm tệp này.
          </p>
        </Modal>
      ) : null}
    </div>
  );
}
