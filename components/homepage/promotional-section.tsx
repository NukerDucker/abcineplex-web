'use client';

interface PromotionalEvent {
  readonly id: number;
  readonly image: string;
  readonly title: string;
}

interface PromotionalSectionProps {
  readonly events: readonly PromotionalEvent[];
}

export function PromotionalSection({ events }: PromotionalSectionProps) {
  return (
    <section className="mb-12">
      {/* Section Header */}
      <div className="mb-10">
        <p className="text-xs tracking-widest text-neutral-400 uppercase mb-4">
          News
        </p>
        <div className="flex gap-8 border-b border-neutral-200">
          <h2 className="pb-4 text-2xl font-light tracking-tight text-black border-b-2 border-black">
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
            <div className="relative overflow-hidden rounded-sm mb-4 aspect-video">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="text-lg font-medium tracking-wide line-clamp-2">
              {event.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}
