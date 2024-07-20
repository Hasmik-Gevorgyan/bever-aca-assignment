import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Table from "./Table";

const Container = styled.div`
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RadioInput = styled.input`
  margin: 0;
  cursor: pointer;
`;

function HomePage({ userId }) {
  const [invoices, setInvoices] = useState([]);
  const [invoicelines, setInvoicelines] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState("");

  useEffect(() => {
    //It doesn't work with https://bever-aca-assignment.azurewebsites.net/invoices?UserId=id
    fetch("https://bever-aca-assignment.azurewebsites.net/invoices")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data) {
          const filteredData = data.value.filter(
            (item) => item.UserId === userId,
          );
          setInvoices(filteredData);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    //----------------------get invoicelines-------------------------------------
    fetch("https://bever-aca-assignment.azurewebsites.net/invoicelines")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data) {
          setInvoicelines(data.value);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    //----------------------get products----------------------------------------
    fetch("https://bever-aca-assignment.azurewebsites.net/products")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data) {
          setProducts(data.value);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Container>
      <Table
        data={invoices.map((item) => {
          const date = new Date(item.PaidDate);
          return {
            radio: (
              <RadioInput
                type="radio"
                name="selectedItem"
                checked={selectedInvoice === item.InvoiceId}
                onChange={() => setSelectedInvoice(item.InvoiceId)}
              />
            ),
            name: item.Name,
            date:
              date.getDate() +
              "." +
              (date.getMonth() > 9
                ? date.getMonth()
                : "0" + (date.getMonth() + 1)) +
              "." +
              date.getFullYear(),
            totalAmount: invoicelines
              .filter((invoice) => invoice.InvoiceId === item.InvoiceId)
              .reduce(
                (accumulator, currentValue) =>
                  accumulator +
                  currentValue.Quantity *
                    products.find(
                      (product) => product.ProductId === currentValue.ProductId,
                    )?.Price,
                0,
              ),
          };
        })}
        headerData={[
          { id: "radio", name: " " },
          { id: "name", name: "Invoice Name" },
          { id: "date", name: "Paid Date" },
          { id: "totalAmount", name: "Total Amount" },
        ]}
      />
      {selectedInvoice && (
        <Table
          headerData={[
            { id: "product", name: "Product" },
            { id: "price", name: "Price Per Unit" },
            { id: "quantity", name: "Quantity" },
            { id: "totalAmount", name: "Total Amount" },
          ]}
          data={invoicelines
            .filter((item) => item.InvoiceId === selectedInvoice)
            .map((invoice) => {
              const product = products.find(
                (product) => product.ProductId === invoice.ProductId,
              );
              return {
                product: product?.Name,
                price: product?.Price,
                quantity: invoice.Quantity,
                totalAmount: invoice.Quantity * product?.Price,
              };
            })}
        />
      )}
    </Container>
  );
}

export default HomePage;
