type FeatureCardProps = {
  title: string;
  description: string;
};

export default function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div
      className="bg-white/[0.04] backdrop-blur-xl border border-white/10 
                 p-8 rounded-2xl hover:border-purple-500/40 
                 hover:bg-white/[0.06] transition-all duration-300"
    >
      <h3 className="text-lg font-semibold mb-3">
        {title}
      </h3>

      <p className="text-gray-400 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}
