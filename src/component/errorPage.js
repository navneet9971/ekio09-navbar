import { useHistory } from "react-router-dom";

export default function ErrorPage() {
const history = useHistory();

const handleClick = () => {
history.push("/");
};

return (
<div id="error-page">
<h1>Oops!</h1>
<p>Sorry, an unexpected error has occurred.</p>
<button onClick={handleClick}>Go back to login page</button>
</div>
);
}