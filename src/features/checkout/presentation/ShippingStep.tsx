const ShippingStep = ({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
    return (
        <div>
            <h3>Datos de Envío</h3>
            <form>
                <div>
                    <label>Dirección</label>
                    <input type="text" placeholder="Ingresa tu dirección" required />
                </div>
            </form>
            <div>
                <button onClick={onBack}>Atrás</button>
                <button onClick={onNext}>Continuar</button>
            </div>
        </div>
    );
};

export default ShippingStep;
