import { parse } from "cookie";
import jwt from "jsonwebtoken";

export async function getServerSideProps(context) {
    const { req } = context;
    const cookies = parse(req.headers.cookie || "");
    const token = cookies.token;

    if (!token) {
        // Redirect to login if no token is found
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }

    try {
        const verified = jwt.verify(token, process.env.NEXTAUTH_SECRET);
        return {
            props: { user: verified }, // Pass user data to the page
        };
    } catch (error) {
        // If token is invalid, redirect to login
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }
}

// Your protected page component
const ProtectedPage = ({ user }) => {
    return (
        <div>
            <h1>Welcome, {user.username}</h1>
        </div>
    );
};

export default ProtectedPage;
