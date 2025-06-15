
import React from "react";
import Layout from "../components/Layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";

const saldoDisponivel = 3200.75; // valor mock; no futuro puxar do backend

const Withdraw = () => {
  const [sucesso, setSucesso] = React.useState(false);

  const handleSaque = (e: React.FormEvent) => {
    e.preventDefault();
    // No futuro: implementar lógica real do saque com API/backend.
    setSucesso(true);
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-6">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Wallet className="h-6 w-6 text-muted-foreground" />
              <CardTitle>Solicitar Saque</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-gray-700">
              Saldo disponível: <span className="font-bold">{saldoDisponivel.toLocaleString("pt-BR", { style: "currency", currency: "MZN" })}</span>
            </p>
            <form onSubmit={handleSaque} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Valor a sacar</label>
                <input
                  type="number"
                  required
                  max={saldoDisponivel}
                  min={1}
                  defaultValue={saldoDisponivel}
                  className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                  name="amount"
                />
                <span className="text-xs text-gray-500">Disponível: {saldoDisponivel.toLocaleString("pt-BR", { style: "currency", currency: "MZN" })}</span>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Conta de pagamento (M-Pesa, IBAN, etc)</label>
                <input
                  type="text"
                  required
                  placeholder="Número ou IBAN"
                  className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                  name="account"
                />
              </div>
              <Button type="submit" className="w-full">
                Solicitar Saque
              </Button>
            </form>
            {sucesso && (
              <div className="mt-4 p-2 rounded bg-green-100 text-green-800 text-center text-sm font-medium">
                Requisição de saque enviada com sucesso!
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Withdraw;

