"use client";
import { motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";
import "./product-card.css";

export default function ProductCard({ product, index = 0 }) {
    const { addItem } = useCart();

    return (
        <motion.article
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.08 }}
            className="pcard"
        >
            <div className="pcard__img">
                <img src={product.image} alt={product.name} loading="lazy" />
                {product.tag && <span className="pcard__tag">{product.tag}</span>}
                <button
                    className="pcard__add"
                    onClick={() => addItem(product)}
                    aria-label="Добавить в корзину"
                >
                    <FiPlus />
                </button>
            </div>
            <div className="pcard__body">
                <h3 className="pcard__name">{product.name}</h3>
                <p className="pcard__desc">{product.desc}</p>
                <div className="pcard__footer">
                    <span className="pcard__price">{formatPrice(product.price)}</span>
                    <button className="pcard__btn" onClick={() => addItem(product)}>
                        В корзину
                    </button>
                </div>
            </div>
        </motion.article>
    );
}