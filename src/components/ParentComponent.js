const ParentComponent = () => {
    const [buyers, setBuyers] = useState([]);
    const [sellers, setSellers] = useState([]);

    useEffect(() => {
        // Fetch kupující a prodávající pomocí API volání
        // Nastavení dat kupujících a prodávajících pomocí setBuyers a setSellers
    }, []);

    return (
        <InvoiceTable buyers={buyers} sellers={sellers} />
    );
};

export default ParentComponent;