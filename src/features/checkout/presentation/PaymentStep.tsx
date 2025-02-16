const PaymentStep = ({ onBack }: { onBack: () => void }) => {
    return (
        <div>
            <h3>Método de pago</h3>
            <form>
                <div>
                    <label>test</label>
                    <input type="text" placeholder="test" required />
                </div>
            </form>
            <div>
                <button onClick={onBack}>Atrás</button>
            </div>
        </div>
    );
};

export default PaymentStep;
