type StatCardProps = {
    label: string;
    value: number;
};

export default function StatCard({
    label,
    value,
}: StatCardProps) {
    return (
        <div
            style={{
                background: "linear-gradient(135deg, var(--surface), var(--purple-dark))",
                border: "1px solid var(--border)",
                borderRadius: 16,
                padding: 18,
            }}
        >
            <p
                style={{
                    color: "var(--muted)",
                    margin: 0,
                    fontSize: 14,
                }}
            >
                {label}
            </p>

            <h2
                style={{
                    margin: "8px 0 0",
                    fontSize: 32,
                }}
            >   
            {value}
            </h2>
        </div>
    );
}
