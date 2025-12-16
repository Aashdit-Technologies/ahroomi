"use client";
import Image from "next/image";

import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { FaTrashAlt } from "react-icons/fa";
import { TfiPlus, TfiMinus } from "react-icons/tfi";
import { CiGift } from "react-icons/ci";
import { FaCcVisa } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { SiPhonepe } from "react-icons/si";
import { SiPaytm } from "react-icons/si";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";

import plix1 from "../../../../public/assets/images/plix1.png";
import plix2 from "../../../../public/assets/images/plix2.png";
import PlaceorderModal from "./PlaceorderModal";

type OffcanvasCartProps = {
  isOpen: boolean;
  onClose: () => void;
};

type CartItem = {
  id: string;
  title: string;
  subtitle?: string;
  price: number;
  mrp?: number;
  discountLabel?: string;
  qty: number;
};

const sampleItems: CartItem[] = [
  {
    id: "p1",
    title: "Multi Power 500mg Apple Cider Vinegar Effervescent (Pack of 4)",
    subtitle: "Pack of 4 Tubes",
    price: 1199,
    mrp: 1245,
    discountLabel: "4% OFF",
    qty: 1,
  },
  {
    id: "p2",
    title: "Avocado Ceramide Moisture Rush Luxury Body Butter",
    subtitle: "200 g",
    price: 599,
    mrp: 650,
    discountLabel: "8% OFF",
    qty: 1,
  },
];

export default function OffcanvasCart({ isOpen, onClose }: OffcanvasCartProps) {
  const [items, setItems] = React.useState<CartItem[]>(sampleItems);
  const [offersOpen, setOffersOpen] = React.useState(false);
  const [paymentSummaryOpen, setPaymentSummaryOpen] = React.useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);

  const handleBuyNow = () => {
    setShowOrderModal(true);
  };

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) {
      document.addEventListener("keydown", onKey);
    } else {
      document.removeEventListener("keydown", onKey);
    }
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    // Prevent body scroll when cart is open
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const increase = (id: string) => {
    setItems((s) =>
      s.map((it) => (it.id === id ? { ...it, qty: it.qty + 1 } : it))
    );
  };
  const decrease = (id: string) => {
    setItems((s) =>
      s.map((it) =>
        it.id === id ? { ...it, qty: Math.max(1, it.qty - 1) } : it
      )
    );
  };
  const removeItem = (id: string) => {
    setItems((s) => s.filter((it) => it.id !== id));
  };

  const subtotal = items.reduce((acc, it) => acc + it.price * it.qty, 0);
  const itemDiscount = items.reduce(
    (acc, it) => acc + ((it.mrp ?? it.price) - it.price) * it.qty,
    0
  );
  const platformFee = 5;
  const prepaidDiscount = 50;
  const shippingCharges = 0;
  const grandTotal = subtotal - prepaidDiscount + platformFee + shippingCharges;

  // Slide-in class
  const panelClasses =
    "fixed right-0 top-0 h-full w-full sm:w-[420px] md:w-[480px] z-50 transform transition-transform duration-300 ease-out";
  const backdropClasses = "fixed inset-0 bg-black/50 z-40 transition-opacity";

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden={!isOpen}
        className={`${backdropClasses} ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Panel */}
      <aside
        aria-hidden={!isOpen}
        className={`${panelClasses} ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="Shopping cart"
      >
        <div className="h-full flex flex-col bg-white shadow-2xl">
          {/* Header (fixed) */}
          <div className="flex items-center justify-between px-5 py-2 shadow-md bg-[#22a6dd]">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold text-white">
                Shopping Cart
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                aria-label="Close cart"
                className="p-2 rounded-full transition"
              >
                <RxCross2 className="text-white" size={20} />
              </button>
            </div>
          </div>

          {/* Body (scrollable) */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 bg-[#f9f9f9]">
            <div className="flex items-center justify-between">
              <h4 className="text-[#075090] text-lg italic leading-tight">
                Product Summary
              </h4>
              <span className="text-xs bg-green-200 text-green-800  px-2 py-0.5 rounded-full font-medium">
                Total Savings: ₹{Math.round(itemDiscount)}
              </span>
            </div>
            {/* Product list */}
            <div className="space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <div className="text-2xl mb-4">🛒</div>
                  <div className="font-medium">Your cart is empty</div>
                  <div className="text-sm mt-2">
                    Add items to see them here.
                  </div>
                </div>
              ) : (
                items.map((it) => (
                  <div
                    key={it.id}
                    className="bg-white border border-[#e2e7e8] shadow-sm rounded-lg p-3 flex gap-3 items-start"
                  >
                    {/* image placeholder */}
                    <div className="w-20 h-20 rounded-md shrink-0 flex items-center justify-center">
                      <Image src={plix1} alt="Product" className="rounded-md" />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start gap-3">
                        <div>
                          <div className="text-sm font-semibold text-gray-800 leading-tight">
                            {it.title}
                          </div>
                          {it.subtitle && (
                            <div className="text-xs text-gray-500 mt-1">
                              {it.subtitle}
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => removeItem(it.id)}
                          className="text-gray-400 hover:text-red-700 p-1 rounded"
                        >
                          <FaTrashAlt />
                        </button>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="text-sm text-gray-700 font-semibold">
                            ₹{it.price.toFixed(0)}
                          </div>
                          {it.mrp && (
                            <div className="text-xs line-through text-gray-400">
                              ₹{it.mrp}
                            </div>
                          )}
                          {it.discountLabel && (
                            <div className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded ml-1">
                              {it.discountLabel}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => decrease(it.id)}
                            className="w-8 h-8 rounded-md border border-[#e2e7e8] shadow-sm flex items-center justify-center hover:bg-gray-50"
                          >
                            <TfiMinus className="text-[10px]" />
                          </button>
                          <div className="px-3 py-1 border border-[#e2e7e8] shadow-sm rounded text-sm w-10 text-center">
                            {it.qty}
                          </div>
                          <button
                            onClick={() => increase(it.id)}
                            className="w-8 h-8 rounded-md border border-[#e2e7e8] shadow-sm flex items-center justify-center hover:bg-gray-50"
                          >
                            <TfiPlus className="text-[10px]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Faster Results With - horizontal scroller */}
            <div>
              <h4 className="text-base font-semibold text-gray-800 mb-3">
                Faster Results With
              </h4>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {/* Cards */}
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className=" bg-white border border-[#c3ced2] shadow-sm rounded-md p-3 shrink-0"
                  >
                    <div className="w-full h-24 rounded-md  flex items-center justify-center mb-3">
                      <Image src={plix2} alt="Product" className="rounded-md" />
                    </div>
                    <div className="text-sm font-medium">
                      Avocado Ceramide Body Butter
                    </div>
                    <div className="text-xs text-gray-500">Pack of 4</div>
                    <button className="mt-3 w-full text-sm border rounded-md py-1 text-green-600 hover:bg-green-50">
                      + ADD
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Offers & Coupons */}
            <div className="bg-white border border-[#e2e7e8] shadow-sm rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <CiGift className="text-2xl text-green-600" />
                  <div>
                    <div className="font-medium text-gray-800">
                      Offers and Coupons
                    </div>
                    <div className="text-xs text-gray-500">3 Offers</div>
                  </div>
                </div>

                <button
                  className="text-[#22a6dd] font-medium text-sm"
                  onClick={() => setOffersOpen((s) => !s)}
                >
                  {offersOpen ? "Hide" : "View"}
                </button>
              </div>

              {offersOpen && (
                <div className="mt-3 text-sm text-gray-600 space-y-2">
                  <input
                    placeholder="Enter Coupon Code"
                    className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#22a6dd]"
                  />
                  <ul className="list-disc list-inside text-xs text-gray-600 mt-2 space-y-1">
                    <li>This offer cannot be clubbed with other offers</li>
                    <li>Free Shipping on orders above Rs. 599</li>
                    <li>
                      Use code SANTA to get 2 ACV Sachets Mini Free. Valid on
                      orders ₹999+
                    </li>
                    <li>
                      Prepaid discount cannot be combined with wallet payments
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Payment Summary (accordion) */}
            <div className="bg-white border border-[#e2e7e8] shadow-sm rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div className="font-medium text-gray-800">Payment Summary</div>
                <button
                  onClick={() => setPaymentSummaryOpen((s) => !s)}
                  className="text-[#22a6dd] text-sm"
                >
                  {paymentSummaryOpen ? "Hide" : "View"}
                </button>
              </div>

              {paymentSummaryOpen && (
                <div className="mt-3 text-sm text-gray-700 space-y-2">
                  <div className="flex justify-between">
                    <span>MRP</span>
                    <span>₹{(subtotal + itemDiscount).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Item Discount</span>
                    <span>₹{itemDiscount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sub Total</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping Charges</span>
                    <span className="text-green-600">FREE</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Platform Fee</span>
                    <span>₹{platformFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Coupon Discount</span>
                    <span>₹0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Prepaid Discount</span>
                    <span className="text-green-600">
                      -₹{prepaidDiscount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between border-t pt-2 font-semibold">
                    <span>Grand Total</span>
                    <span>₹{grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Spacer to allow footer not to overlap */}
            <div className="h-5" />
          </div>

          {/* Footer (fixed) */}
          <div className="px-5 pb-5 pt-3 border-t border-[#ecf0f2] bg-white">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-1">
                <div className="text-base text-gray-600">Total</div>
                <div className="text-lg">₹{grandTotal.toFixed(0)}</div>
              </div>
              <div className="flex flex-col items-end">
                <div className="text-xs bg-green-200 text-green-800  px-2 py-0.5 rounded-full font-medium">
                  Free Shipping
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Est. delivery 3-5 days
                </div>
              </div>
            </div>

            <div className="relative flex items-center gap-3">
              {/* BUTTON */}
              <button
                onClick={handleBuyNow}
                className="flex items-center justify-between w-full bg-[#22a6dd] text-white py-3 px-4 rounded-lg font-semibold text-base shadow"
              >
                <span>PLACE ORDER</span>

                {/* Right side icons */}
                <div className="flex items-center ml-3">
                  {/* Google / GPay */}
                  <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
                    <FcGoogle className="text-[18px]" />
                  </div>

                  {/* Visa */}
                  <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center -ml-1.5">
                    <FaCcVisa className="text-[18px] text-blue-700" />
                  </div>

                  {/* PayPal (alternative for Paytm/PhonePe) */}
                  <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center -ml-1.5">
                    <SiPhonepe className="text-[18px] text-blue-600" />
                  </div>

                  {/* PayPal (alternative for Paytm/PhonePe) */}
                  <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center -ml-1.5">
                    <SiPaytm className="text-[18px] text-blue-600" />
                  </div>

                  {/* Arrow */}
                  <LiaLongArrowAltRightSolid className="text-white text-xl font-bold" />
                </div>
              </button>

              {/* Prepaid Tag */}
              <div className="absolute -top-4 left-4">
                <div className="rounded p-1 inline-block bg-black text-white text-[10px] font-semibold px-3">
                  Extra 10% Off on Prepaid*
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
      <PlaceorderModal
        isOpen={showOrderModal}
        onClose={() => setShowOrderModal(false)}
      />
    </>
  );
}
