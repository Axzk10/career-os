type ToastProps = {
    message: string;
    type?: "success" | "error";
};

export default function Toast({
    message,
    type = "success",
}: ToastProps) {
    return (
        <div 
            style={{
                position: "fixed",
                right: 24,
                bottom: 24,
                zIndex: 9999,

                background: 
                    type === "success"
                        ? "#1d3b2a"
                        : "#4b1d1d",
                border:
                    type === "success"
                        ? "1px solid #22c55e"
                        : "1px solid #ef4444",

                    color: "white",

                    padding: "14px 18px",

                    borderRadius: 14,

                    boxShadow:
                    "0 18px 40px rgba(0,0,0,.35)",

                    display: "flex",
                    alignItems: "center",
                    gap: 10,

                    minWidth: 280,
                }}
                >
                <span style={{ fontSize: 18 }}>
                    {type === "success" ? "✅" : "❌"}
                </span>

                <strong>{message}</strong>
            </div>                    
    );
}
