'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import ModeToggle from "./mode-toggle";
import { EllipsisVertical, ShoppingCartIcon } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import ProfileStateButton from "@/components/auth/profile-state";

const MenuHeader = () => {
    return (
        <div className="flex justify-center items-center">
            <nav className='hidden md:flex w-full items-center'>
              <ModeToggle />
              <Button asChild variant={'ghost'}>
                <Link href={'/cart'}>
                  <ShoppingCartIcon className="size-4" />
                  Cart
                </Link>
              </Button>
              <ProfileStateButton />
            </nav>
            <nav className='md:hidden'>
                <Sheet>
                    <SheetTrigger className="align-middle">
                        <EllipsisVertical />
                    </SheetTrigger>
                    <SheetContent className="flex flex-col items-start p-4 max-w-xs">
                      <SheetTitle></SheetTitle>
                      <ModeToggle />
                      <Button asChild variant={'ghost'}>
                        <Link href={'/cart'}>
                          <ShoppingCartIcon />Cart
                        </Link>
                      </Button>
                    <ProfileStateButton></ProfileStateButton>
                    </SheetContent>
                    <SheetDescription></SheetDescription>
                </Sheet>
            </nav>
        </div>
    )
}

export default MenuHeader;
