import { StaticImage } from "@components/common/StaticImage.js";
import { _ } from "@evershop/evershop/lib/locale/translate/_";
import React from "react";

export default function OurStory() {
  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl mb-6">Our Story</h2>
            <p className="text-muted-foreground text-lg mb-6">
              For over 15 years, Sweet Dreams Bakery has been creating
              exceptional cakes that bring joy to life's special moments. Our
              master bakers combine traditional techniques with innovative
              flavors to craft each cake with precision and passion.
            </p>
            <p className="text-muted-foreground text-lg mb-8">
              From intimate birthday celebrations to grand wedding receptions,
              we believe every occasion deserves a cake that's as unique and
              memorable as the moment itself.
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl mb-2">15+</div>
                <div className="text-sm text-muted-foreground">
                  {_("Years Experience")}
                </div>
              </div>
              <div>
                <div className="text-2xl mb-2">500+</div>
                <div className="text-sm text-muted-foreground">
                  {_("Happy Customers")}
                </div>
              </div>
              <div>
                <div className="text-2xl mb-2">50+</div>
                <div className="text-sm text-muted-foreground">
                  {_("Cake Varieties")}
                </div>
              </div>
            </div>
          </div>
          <div className="aspect-square overflow-hidden rounded-lg">
            <StaticImage
              subPath="our-story.jpg"
              width={1200}
              height={1200}
              sizes="50vw"
              alt="Bakery cupcakes display"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export const layout = {
  areaId: "content",
  sortOrder: 25,
};
