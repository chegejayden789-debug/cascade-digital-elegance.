import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle } from "lucide-react";

const WhatsAppWidget = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="mb-4 w-72 overflow-hidden rounded-lg border border-primary/10 bg-card shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-[#25D366] px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                  <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Cascade Premier</p>
                  <p className="text-xs text-white/80">Typically replies instantly</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Chat bubble */}
            <div className="bg-card/80 p-4">
              <div className="rounded-lg rounded-tl-none bg-secondary p-3">
                <p className="font-body text-sm text-foreground">
                  Hello! 👋 Welcome to Cascade Premier. How can we help you today?
                </p>
                <p className="mt-1 text-right font-body text-[10px] text-muted-foreground">
                  Now
                </p>
              </div>
            </div>

            {/* Quick actions */}
            <div className="border-t border-border p-3 space-y-2">
              <a
                href="https://wa.me/254708888444?text=Hi%20Cascade%20Premier!%20I'd%20like%20to%20place%20an%20order"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-md bg-[#25D366] px-4 py-2.5 text-center font-body text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                🍽️ Order Food
              </a>
              <a
                href="https://wa.me/254708888444?text=Hi%20Cascade%20Premier!%20I'd%20like%20to%20make%20a%20reservation"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-md border border-[#25D366]/30 px-4 py-2.5 text-center font-body text-sm font-medium text-[#25D366] transition-colors hover:bg-[#25D366]/10"
              >
                📅 Make Reservation
              </a>
              <a
                href="https://wa.me/254708888444?text=Hi%20Cascade%20Premier!%20I%20have%20a%20question"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-md border border-[#25D366]/30 px-4 py-2.5 text-center font-body text-sm font-medium text-[#25D366] transition-colors hover:bg-[#25D366]/10"
              >
                💬 Ask a Question
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/30 transition-colors"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="h-6 w-6 text-white" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle className="h-6 w-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Pulse ring when closed */}
      {!open && (
        <span className="absolute bottom-0 right-0 h-14 w-14 animate-ping rounded-full bg-[#25D366]/30 pointer-events-none" />
      )}
    </div>
  );
};

export default WhatsAppWidget;
