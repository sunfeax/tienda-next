'use client';

import Image from "next/image";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="flex flex-col border border-slate-100 items-center justify-center min-h-screen">
      <div className="p-6 rounded-xl border border-gray-100 shadow-2xl text-center bg-white">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-amber-400">
          <Image src="/logo.svg" alt="logo" width={28} height={28} priority />
        </div>
        <h1 className="text-3xl font-bold mb-4">Ooops...</h1>
        <p className="text-destructive">The request page could not be found.</p>
        <Button
          variant={'default'}
          className="mt-4 ml-2"
          onClick={() => window.location.href = '/'}
        >
          Back to Home
        </Button>
      </div>
    </div>
  )
};

export default NotFound;
