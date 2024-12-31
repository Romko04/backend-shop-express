const nodemailer = require('nodemailer');

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
    }

    generateHtmlContent(orderDetails) {
        return `
        <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                }
                h1 {
                    color: #007BFF;
                }
                ul {
                    list-style-type: none;
                    padding: 0;
                }
                li {
                    margin-bottom: 10px;
                }
                .product-image {
                    max-width: 100px;
                    margin-top: 10px;
                }
                .order-details, .product-details {
                    border: 1px solid #ddd;
                    padding: 10px;
                    margin-bottom: 20px;
                    border-radius: 5px;
                }
                .order-details h2, .product-details h2 {
                    margin-top: 0;
                }
            </style>
            <h1>Order Confirmation</h1>
            <p>Your order has been placed successfully. Here are the details:</p>
            <ul>
                <li><strong>Order ID:</strong> ${orderDetails.id}</li>
                <li><strong>Name:</strong> ${orderDetails.name}</li>
                <li><strong>Phone:</strong> ${orderDetails.phone}</li>
                <li><strong>Address:</strong> ${orderDetails.address}</li>
                <li><strong>Total Price:</strong> ${orderDetails.totalPrice}</li>
                <li><strong>Payment Method:</strong> ${orderDetails.payment_method?.name || 'N/A'}</li>
                <li><strong>Delivery Method:</strong> ${orderDetails.delivery_method?.name || 'N/A'}</li>
            </ul>
            <h2>Products</h2>
            <ul>
                ${orderDetails.OrderProducts.map(product => `
                    <li>
                        <strong>Product Name:</strong> ${product.product?.name || 'N/A'}<br>
                        <strong>Quantity:</strong> ${product.quantity}<br>
                        <strong>Price:</strong> ${product.product.price}<br>
                        <img src="${process.env.HOME_URL+'/'+product.product?.image}" alt="${product.product?.name || 'N/A'}" style="max-width: 100px;">
                    </li>
                `).join('')}
            </ul>
        `;
    }


    async sendOrderConfirmation(email, orderDetails) {

        const htmlContent = this.generateHtmlContent(orderDetails);

        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'Order Confirmation',
            html: htmlContent,
        };

        try {
            await this.transporter.sendMail(mailOptions);
            console.log('Order confirmation email sent successfully');
        } catch (error) {
            console.error('Error sending order confirmation email:', error);
        }
    }
}

module.exports = new EmailService();