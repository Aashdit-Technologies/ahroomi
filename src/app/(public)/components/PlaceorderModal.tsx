"use client";
import { FaTimes } from "react-icons/fa";
import ahroomiLogo from "../../public/assets/images/ahroomoLogo.png";

interface PlaceorderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PlaceorderModal({
  isOpen,
  onClose,
}: PlaceorderModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
            <div className="flex items-center justify-between p-6">
              <div>
                
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FaTimes className="text-gray-500 text-xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
