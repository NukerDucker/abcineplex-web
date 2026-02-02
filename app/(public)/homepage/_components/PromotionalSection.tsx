'use client';

import React from 'react';

interface PromoEvent {
  id: number;
  image: string;
  title: string;
}

interface PromotionalSectionProps {
  events: PromoEvent[];
}

const PromotionalSection: React.FC<PromotionalSectionProps> = ({ events }) => {
  return (
    <section className="mb-12">
      {/* Section Header */}
      <div className="mb-10">
        <p className="text-xs tracking-[0.2em] text-neutral-400 uppercase mb-4">
          News
        </p>
        <div className="flex gap-8 border-b border-neutral-200">
          <h2 className="pb-4 text-2xl font-light tracking-tight text-black border-b-2 border-black -mb-[2px]">
            Promotional
          </h2>
          <h2 className="pb-4 text-2xl font-light tracking-tight text-neutral-400">
            Event
          </h2>
        </div>
      </div>

      {/* Promo Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-sm mb-4 aspect-[3/2]">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-end p-4">
                <h3 className="text-white font-medium text-lg tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {event.title}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PromotionalSection;
