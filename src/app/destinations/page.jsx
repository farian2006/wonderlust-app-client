
const DestinationsPage = async () => {
    "use cache";
    const response = await fetch('http://localhost:5000/destinations');
    const destinations = await response.json();
    
    return (
        <div>
            Destinations Page
        </div>
    );
};

export default DestinationsPage;