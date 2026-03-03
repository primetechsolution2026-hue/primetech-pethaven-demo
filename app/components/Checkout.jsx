// C:\xampp\htdocs\PrimeTech Solutions\mypets\app\components\Checkout.jsx
"use client";
import { useState, useEffect } from "react";

// Icons
const BackIcon = () => <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>;
const CloseIcon = () => <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>;
const CheckIcon = () => <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const LockIcon = () => <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;

// Step progress bar
function StepBar({ step }) {
  const steps = ["Your Info", "Address", "Payment", "Review"];
  return (
    <div className="flex items-center w-full">
      {steps.map((label, i) => {
        const idx = i + 1;
        const done = step > idx;
        const active = step === idx;
        return (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1 shrink-0">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${done ? "bg-emerald-500 text-white" : active ? "bg-blue-600 text-white ring-4 ring-blue-100" : "bg-slate-100 text-slate-400"}`}>
                {done ? <CheckIcon /> : idx}
              </div>
              <span className={`text-[10px] font-semibold ${active ? "text-blue-600" : done ? "text-emerald-500" : "text-slate-400"}`}>{label}</span>
            </div>
            {i < steps.length - 1 && <div className={`flex-1 h-0.5 mx-2 mb-4 ${done ? "bg-emerald-300" : "bg-slate-100"}`} />}
          </div>
        );
      })}
    </div>
  );
}

// Input field component
function Field({ label, type = "text", placeholder, value, onChange, error, half }) {
  return (
    <div className={half ? "col-span-1" : "col-span-2"}>
      <label className="block text-xs font-semibold text-slate-600 mb-1.5">{label}</label>
      <input type={type} placeholder={placeholder} value={value} onChange={onChange}
        className={`w-full border rounded-xl px-4 py-3 text-sm outline-none transition-all ${error ? "border-red-400 bg-red-50" : "border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"}`} />
      {error && <p className="text-red-500 text-[11px] mt-1">{error}</p>}
    </div>
  );
}

export default function Checkout({ pet, onClose }) {
  const [step, setStep] = useState(1);
  const [confirmed, setConfirmed] = useState(false);
  const [info, setInfo] = useState({ firstName: "", lastName: "", email: "", phone: "" });
  const [addr, setAddr] = useState({ street: "", city: "", state: "", zip: "", country: "" });
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [errors, setErrors] = useState({});
  const [payMethod, setPayMethod] = useState("card");
  const [gcashNum, setGcashNum] = useState("");

  const adoptionFee = pet.price;
  const vetFee = Math.round(pet.price * 0.08);
  const processFee = 25;
  const total = adoptionFee + vetFee + processFee;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const validate = () => {
    const e = {};
    if (step === 1) {
      if (!info.firstName.trim()) e.firstName = "Required";
      if (!info.lastName.trim()) e.lastName = "Required";
      if (!info.email.includes("@")) e.email = "Valid email required";
      if (info.phone.replace(/\D/g, "").length < 7) e.phone = "Valid phone required";
    }
    if (step === 2) {
      if (!addr.street.trim()) e.street = "Required";
      if (!addr.city.trim()) e.city = "Required";
      if (!addr.zip.trim()) e.zip = "Required";
      if (!addr.country.trim()) e.country = "Required";
    }
    if (step === 3 && payMethod === "card") {
      if (card.number.replace(/\s/g, "").length < 12) e.cardNumber = "Valid card required";
      if (!card.name.trim()) e.cardName = "Required";
      if (!card.expiry.trim()) e.cardExpiry = "Required";
      if (card.cvv.length < 3) e.cardCvv = "Required";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validate()) setStep(s => Math.min(s + 1, 4)); };
  const back = () => { setErrors({}); setStep(s => Math.max(s - 1, 1)); };
  const submit = () => { if (validate()) setConfirmed(true); };

  const fmtCard = v => v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  const fmtExpiry = v => { const d = v.replace(/\D/g, "").slice(0, 4); return d.length >= 3 ? `${d.slice(0, 2)}/${d.slice(2)}` : d; };

  // Confirmed screen
  if (confirmed) {
    return (
      <>
        <div className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm" onClick={onClose} />
        <div className="fixed inset-y-0 right-0 z-[80] w-full md:w-[520px] bg-white shadow-2xl flex flex-col items-center justify-center px-10 text-center animate-[coSlide_0.32s_ease_both]">
          <style>{`@keyframes coSlide{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}`}</style>
          <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center mb-6 text-5xl">🐾</div>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Adoption Confirmed!</h2>
          <p className="text-slate-400 text-sm mb-6 leading-relaxed max-w-sm">
            Congratulations! <span className="font-bold text-slate-700">{pet.name}</span> is coming home.
            We will email your paperwork to <span className="font-semibold text-blue-600">{info.email}</span>.
          </p>
          <div className="w-full bg-slate-50 rounded-2xl p-5 mb-6 text-left">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0">
                <img src={pet.images} alt={pet.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="font-bold text-slate-800">{pet.name}</div>
                <div className="text-xs text-slate-400">{pet.breed} · {pet.sex} · {pet.age}</div>
                <div className="text-blue-600 font-extrabold text-sm mt-0.5">${total.toLocaleString()} total</div>
              </div>
            </div>
            <div className="bg-emerald-50 rounded-xl px-3 py-2 text-xs flex items-center gap-2">
              <span className="text-emerald-600 font-bold">Confirmation #</span>
              <span className="font-mono text-slate-600">{Math.random().toString(36).slice(2, 9).toUpperCase()}</span>
            </div>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <button onClick={onClose} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl py-3 transition-colors">Back to PetHaven</button>
            <button onClick={onClose} className="w-full border-2 border-slate-200 text-slate-600 font-semibold rounded-2xl py-3 text-sm">View adoption documents</button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{`@keyframes coSlide{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}`}</style>
      <div className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 z-[80] w-full md:w-[560px] bg-white shadow-2xl flex flex-col animate-[coSlide_0.32s_ease_both]">

        {/* Header */}
        <div className="shrink-0 flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            {step > 1 && (
              <button onClick={back} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
                <BackIcon />
              </button>
            )}
            <div>
              <h2 className="font-extrabold text-slate-800 text-lg">Adopt {pet.name}</h2>
              <p className="text-xs text-slate-400">Step {step} of 4</p>
            </div>
          </div>
          <button onClick={onClose} className="w-9 h-9 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center transition-colors">
            <CloseIcon />
          </button>
        </div>

        {/* Step bar */}
        <div className="shrink-0 px-6 pt-5 pb-2"><StepBar step={step} /></div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4">

          {/* Pet summary strip */}
          <div className="flex items-center gap-4 bg-blue-50 rounded-2xl p-4 mb-6">
            <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0">
              <img src={pet.images} alt={pet.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-slate-800 truncate">{pet.name}</div>
              <div className="text-xs text-slate-400">{pet.breed} · {pet.sex} · {pet.age}</div>
            </div>
            <div className="text-blue-600 font-extrabold text-lg">${pet.price.toLocaleString()}</div>
          </div>

          {/* STEP 1 - Personal Info */}
          {step === 1 && (
            <div>
              <h3 className="font-extrabold text-slate-800 mb-5 flex items-center gap-2">
                <span className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center text-sm">👤</span>
                Personal Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <Field label="First Name"    placeholder="John"            value={info.firstName} onChange={e => setInfo({ ...info, firstName: e.target.value })} error={errors.firstName} half />
                <Field label="Last Name"     placeholder="Doe"             value={info.lastName}  onChange={e => setInfo({ ...info, lastName: e.target.value })}  error={errors.lastName}  half />
                <Field label="Email Address" placeholder="you@email.com"   value={info.email}     onChange={e => setInfo({ ...info, email: e.target.value })}     error={errors.email}     type="email" />
                <Field label="Phone Number"  placeholder="+1 555 000 0000" value={info.phone}     onChange={e => setInfo({ ...info, phone: e.target.value })}     error={errors.phone}     type="tel" />
              </div>
              <div className="mt-5 bg-amber-50 border border-amber-100 rounded-2xl p-4">
                <p className="text-xs text-amber-700 font-medium leading-relaxed">
                  🏡 By proceeding, you confirm you have a suitable home for {pet.name} and agree to our adoption terms.
                </p>
              </div>
            </div>
          )}

          {/* STEP 2 - Address */}
          {step === 2 && (
            <div>
              <h3 className="font-extrabold text-slate-800 mb-5 flex items-center gap-2">
                <span className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center text-sm">🏠</span>
                Delivery Address
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Street Address" placeholder="123 Main St"   value={addr.street}  onChange={e => setAddr({ ...addr, street: e.target.value })}  error={errors.street} />
                <Field label="City"           placeholder="New York"      value={addr.city}    onChange={e => setAddr({ ...addr, city: e.target.value })}    error={errors.city}    half />
                <Field label="State / Region" placeholder="NY"            value={addr.state}   onChange={e => setAddr({ ...addr, state: e.target.value })}              half />
                <Field label="ZIP / Postcode" placeholder="10001"         value={addr.zip}     onChange={e => setAddr({ ...addr, zip: e.target.value })}     error={errors.zip}     half />
                <Field label="Country"        placeholder="United States" value={addr.country} onChange={e => setAddr({ ...addr, country: e.target.value })} error={errors.country} half />
              </div>
              <div className="mt-5 bg-sky-50 border border-sky-100 rounded-2xl p-4">
                <p className="text-xs text-sky-700 font-medium leading-relaxed">
                  📦 {pet.name} will be transported by our certified pet-travel partners within 3 to 5 business days.
                </p>
              </div>
            </div>
          )}

          {/* STEP 3 - Payment */}
          {step === 3 && (
            <div>
              <h3 className="font-extrabold text-slate-800 mb-5 flex items-center gap-2">
                <span className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center text-sm">💳</span>
                Payment Method
              </h3>
              <div className="flex gap-3 mb-6">
                {[{ id: "card", label: "Credit / Debit", icon: "💳" }, { id: "paypal", label: "PayPal", icon: "🅿️" }, { id: "gcash", label: "GCash", icon: "📱" }].map(m => (
                  <button key={m.id} onClick={() => setPayMethod(m.id)}
                    className={`flex-1 flex flex-col items-center gap-1.5 border-2 rounded-2xl py-3 px-2 text-xs font-bold transition-all ${payMethod === m.id ? "border-blue-500 bg-blue-50 text-blue-700" : "border-slate-200 text-slate-500 hover:border-slate-300"}`}>
                    <span className="text-xl">{m.icon}</span>{m.label}
                  </button>
                ))}
              </div>

              {payMethod === "card" && (
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Card Number"  placeholder="1234 5678 9012 3456" value={card.number} onChange={e => setCard({ ...card, number: fmtCard(e.target.value) })}   error={errors.cardNumber} />
                  <Field label="Name on Card" placeholder="John Doe"            value={card.name}   onChange={e => setCard({ ...card, name: e.target.value })}              error={errors.cardName} />
                  <Field label="Expiry"       placeholder="MM/YY"               value={card.expiry} onChange={e => setCard({ ...card, expiry: fmtExpiry(e.target.value) })} error={errors.cardExpiry} half />
                  <Field label="CVV"          placeholder="•••" type="password"  value={card.cvv}   onChange={e => setCard({ ...card, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) })} error={errors.cardCvv} half />
                </div>
              )}
              {payMethod === "paypal" && (
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 text-center">
                  <div className="text-4xl mb-3">🅿️</div>
                  <p className="text-sm font-semibold text-blue-700 mb-1">Continue with PayPal</p>
                  <p className="text-xs text-slate-400">You will be redirected to PayPal to complete payment securely.</p>
                </div>
              )}
              {payMethod === "gcash" && (
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 text-center">
                  <div className="text-4xl mb-3">📱</div>
                  <p className="text-sm font-semibold text-blue-700 mb-2">Pay via GCash</p>
                  <p className="text-xs text-slate-400 mb-4">Enter your registered GCash number to receive a payment prompt.</p>
                  <input placeholder="09XX XXX XXXX" value={gcashNum} onChange={e => setGcashNum(e.target.value)}
                    className="w-full border border-blue-200 bg-white rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-100 text-center font-semibold tracking-widest" />
                </div>
              )}
              <p className="mt-5 text-xs text-slate-400 flex items-center gap-1.5"><LockIcon /> All transactions are encrypted and secure.</p>
            </div>
          )}

          {/* STEP 4 - Review */}
          {step === 4 && (
            <div>
              <h3 className="font-extrabold text-slate-800 mb-5">Review Your Order</h3>
              <div className="mb-5">
                {[
                  ["Adopter", `${info.firstName} ${info.lastName}`],
                  ["Email",   info.email],
                  ["Phone",   info.phone],
                  ["Address", [addr.street, addr.city, addr.state, addr.zip, addr.country].filter(Boolean).join(", ")],
                  ["Payment", payMethod === "card" ? `Card ending ${card.number.slice(-4) || "····"}` : payMethod === "paypal" ? "PayPal" : "GCash"],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between py-3 border-b border-slate-50 text-sm last:border-0">
                    <span className="text-slate-400 font-medium w-24 shrink-0">{label}</span>
                    <span className="text-slate-700 font-semibold text-right leading-snug">{value}</span>
                  </div>
                ))}
              </div>
              <div className="bg-slate-50 rounded-2xl p-5 mb-4">
                <h4 className="font-bold text-slate-700 text-sm mb-3">Cost Breakdown</h4>
                {[["Adoption fee", `$${adoptionFee.toLocaleString()}`], ["Vet and health docs", `$${vetFee.toLocaleString()}`], ["Processing fee", `$${processFee}`]].map(([label, val]) => (
                  <div key={label} className="flex justify-between text-sm py-1.5">
                    <span className="text-slate-400">{label}</span>
                    <span className="text-slate-700 font-semibold">{val}</span>
                  </div>
                ))}
                <div className="border-t border-slate-200 mt-3 pt-3 flex justify-between items-center">
                  <span className="font-extrabold text-slate-800">Total</span>
                  <span className="font-extrabold text-blue-600 text-xl">${total.toLocaleString()}</span>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-emerald-50 rounded-2xl p-4">
                <span className="text-emerald-500 font-bold text-base mt-0.5">✓</span>
                <p className="text-xs text-emerald-700 font-medium leading-relaxed">
                  {pet.name} comes with a health guarantee, vaccination records, and 30-day post-adoption support.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer CTA */}
        <div className="shrink-0 border-t border-slate-100 bg-white px-6 py-4">
          {step < 4 ? (
            <button onClick={next} className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold rounded-2xl py-4 shadow-lg shadow-blue-100 text-sm transition-all">
              Continue
            </button>
          ) : (
            <button onClick={submit} className="w-full bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] text-white font-bold rounded-2xl py-4 shadow-lg shadow-emerald-100 text-sm transition-all flex items-center justify-center gap-2">
              <span>🐾</span> Confirm Adoption — ${total.toLocaleString()}
            </button>
          )}
          <p className="text-center text-[11px] text-slate-400 mt-3 flex items-center justify-center gap-1.5">
            <LockIcon /> Secured by PetHaven · 256-bit SSL encryption
          </p>
        </div>
      </div>
    </>
  );
}