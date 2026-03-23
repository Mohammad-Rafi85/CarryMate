import React from 'react';
import { Truck, ShieldCheck, MapPin, DollarSign, Package, CheckCircle } from 'lucide-react';

const HowItWorksSender = () => {
    return (
        <div className="min-h-screen bg-slate-50 pt-[80px] pb-24">
            {/* Header Content */}
            <div className="bg-indigo-600 text-white pt-16 pb-32 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">How CarryMate Works for Senders</h1>
                    <p className="text-xl text-indigo-100 font-medium">Send your parcels quickly and securely through our verified network of travelers heading your way.</p>
                </div>
            </div>

            {/* Steps Section */}
            <div className="max-w-4xl mx-auto px-6 -mt-20">
                <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-xl border border-slate-100 relative mb-12">
                    
                    <div className="space-y-12">
                        {/* Step 1 */}
                        <div className="flex flex-col md:flex-row gap-6 items-start relative pb-12 border-b border-slate-100">
                            <div className="flex-shrink-0 w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-2xl font-black">1</div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                                    Complete KYC <ShieldCheck className="text-emerald-500" />
                                </h3>
                                <p className="text-slate-600 leading-relaxed text-lg">
                                    Before sending items, verify your identity via mandatory Aadhaar eKYC. It takes less than two minutes and ensures 100% trust and safety for everyone in the CarryMate ecosystem.
                                </p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex flex-col md:flex-row gap-6 items-start relative pb-12 border-b border-slate-100">
                            <div className="flex-shrink-0 w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-2xl font-black">2</div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                                    List Your Item <Package className="text-indigo-500" />
                                </h3>
                                <p className="text-slate-600 leading-relaxed text-lg">
                                    Go to your Dashboard and click "Add Item". Fill out what you are sending (documents, electronics, etc.), upload a photo, specify handling instructions, and pinpoint pickup/drop locations on the Google Map.
                                </p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="flex flex-col md:flex-row gap-6 items-start relative pb-12 border-b border-slate-100">
                            <div className="flex-shrink-0 w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-2xl font-black">3</div>
                            <div className="w-full">
                                <h3 className="text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                                    Match with Traveler <MapPin className="text-blue-500" />
                                </h3>
                                <p className="text-slate-600 leading-relaxed text-lg mb-4">
                                    We notify verified travelers crossing your route. Once a traveler accepts your request, you can coordinate pickup directly.
                                </p>
                                <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                                    <h4 className="font-bold text-slate-700 text-sm mb-2 uppercase tracking-wide">Traveler Matching Criteria</h4>
                                    <ul className="space-y-2 text-sm text-slate-600 font-medium">
                                        <li className="flex gap-2"><CheckCircle size={16} className="text-indigo-400 mt-0.5" /> Background checked & KYC verified</li>
                                        <li className="flex gap-2"><CheckCircle size={16} className="text-indigo-400 mt-0.5" /> High success rate</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div className="flex flex-col md:flex-row gap-6 items-start relative pb-12 border-b border-slate-100">
                            <div className="flex-shrink-0 w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-2xl font-black">4</div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                                    Live Tracking & Delivery <Truck className="text-indigo-500" />
                                </h3>
                                <p className="text-slate-600 leading-relaxed text-lg">
                                    Watch your shipment move in real-time on our interactive maps. You'll get instant status updates when it's picked up, in-transit, and safely delivered to the receiver.
                                </p>
                            </div>
                        </div>

                        {/* Step 5 */}
                        <div className="flex flex-col md:flex-row gap-6 items-start">
                            <div className="flex-shrink-0 w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center text-2xl font-black">5</div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                                    Secure Payment <DollarSign className="text-emerald-500" />
                                </h3>
                                <p className="text-slate-600 leading-relaxed text-lg">
                                    Your money is held in escrow until the package is successfully confirmed as delivered by the receiver. We handle the payouts seamlessly.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HowItWorksSender;
