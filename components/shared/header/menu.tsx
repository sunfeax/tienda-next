'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import ModeToggle from "./mode-toggle";
import { EllipsisVertical, ShoppingCartIcon } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import ToggleSignButton from "@/components/auth/toggle-button";

const MenuHeader = () => {
    return (
        <div className="flex justify-center ">
            <nav className='hidden md:flex w-full'>
                <ModeToggle />
                <Button asChild variant={'ghost'}>
                    <Link href={'/cart'}>
                        <ShoppingCartIcon />Cart
                    </Link>
                </Button>
                <ToggleSignButton></ToggleSignButton>
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
                    <ToggleSignButton></ToggleSignButton>
                    </SheetContent>
                    <SheetDescription></SheetDescription>
                </Sheet>
            </nav>
        </div>
    )
}

export default MenuHeader;
