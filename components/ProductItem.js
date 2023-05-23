import Link from "next/link";

export default function Productitem({ products }) {
    return (
        <div className="card">
            <Link href={`/products/${products.slug}`}>
                <img src={products.image}
                    alt={products.name}
                    className="image-container"
                >
                </img>

                <h2>{products.name}</h2>
                <h2>{products.price}</h2>
                <button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                    Button
                </button>
            </Link>

        </div>
    )
}