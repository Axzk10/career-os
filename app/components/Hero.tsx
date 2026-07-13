type HeroProps = {
    totalJobs: number;
    interviews: number;
    offers: number;
};

export default function Hero({
    totalJobs,
    interviews,
    offers,
}: HeroProps) {
    return (
        <section 
            style={{
                background:
                    "linear-gradient(135deg, var(--purple-dark), var(--surface))",
                    border: "1px solod var(--border)",
                    borderRadius: "var(--radius-lg)",
                    padding: 28,
                    marginBottom: 28,
            }}
        >
            <p
                style={{
                    margin:0,
                    color: "var(--yellow)",
                    fontWeight: 700,
                }}
            >
                👋 Welcome back
            </p>

            <h2
                style={{
                    margin: "8px 0",
                    fontSize: 34,
                }}
            >
                Ready to land your next role?
            </h2>

            <p
                style={{
                    color: "var(--muted)",
                    marginBottom: 20,
                }}
            >
                Keep your applications organised and your momentum going.
            </p>

            <div
                style={{
                    display: "flex",
                    gap: 24,
                    flexWrap: "wrap",
                }}
            >
                <span>📄 {totalJobs} Jobs</span>
                <span>🎤 {interviews} Interviews</span>
                <span>🎉 {offers} Offers</span> 
            </div>
        </section>
    );
}