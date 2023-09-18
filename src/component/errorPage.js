import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
const navigate = useNavigate();

const handleClick = () => {
navigate("/");
};

return (
<div id="error-page">
<h1>Oops!</h1>
<p>Sorry, an unexpected error has occurred.</p>
<button onClick={handleClick}>Go back to login page</button>
</div>
);
}