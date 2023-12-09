
function LoadingSpinner() {
  return (
    <div className="text-center mt-8">
      <p>Fetching Posts...</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        className="w-12 h-12 mx-auto"
      >
        <circle cx="50" cy="50" r="40" stroke="#000000" strokeWidth="8" fill="none">
          <animate attributeName="stroke-dasharray" dur="2s" repeatCount="indefinite" from="0,100" to="100,200" />
          <animate attributeName="stroke-dashoffset" dur="2s" repeatCount="indefinite" from="0" to="-200" />
        </circle>
      </svg>
    </div>
  );
}

export default LoadingSpinner;
