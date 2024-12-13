"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Combobox } from "./tokenSelectInput";
import { Token, TokenWithBalance } from "@/lib/types";
import { ComboboxOutput } from "./ComboboxOutput";

interface TokenInputProps {
  label: string;
  tokens: TokenWithBalance[] | null;
  readOnly?: boolean;
  selectedToken?: TokenWithBalance | undefined;
  onTokenSelect?: (token: TokenWithBalance | undefined) => void;
  tokenList?: Token[] | null;
}

export default function TokenInput({
  label,
  tokens,
  selectedToken,
  onTokenSelect,
  tokenList,
  readOnly = false,
}: TokenInputProps) {
  const [amount, setAmount] = useState<string | undefined>("");
  return (
    <div
      className={`w-full flex bg-white pt-4 px-5 border border-grey-100 pb-5 ${
        readOnly ? "rounded-b-lg" : "rounded-t-lg"
      }`}
    >
      <div className="flex w-full flex-row items-center justify-between mobile:max-h-[92px] mobile:min-h-[92px]">
        <div className="flex flex-col items-start whitespace-nowrap">
          <p className="text-xs font-semibold text-grey-800 mobile:mb-2">
            {label}
          </p>
          {!readOnly ? (
            <div className="relative">
              {tokens && (
                <Combobox onTokenSelect={onTokenSelect} tokens={tokens} />
              )}
            </div>
          ) : (
            <div className="relative">
              {readOnly && (
                <ComboboxOutput
                  onTokenSelect={onTokenSelect}
                  tokens={tokenList}
                />
              )}
            </div>
          )}
          <div className="mt-1 inline-flex gap-1 text-xs text-grey-400 mobile:mt-2">
            {!readOnly && (
              <span>
                <span>Current Balance: </span>
                <span className="font-bold">
                  {selectedToken?.balance} {selectedToken?.symbol}
                </span>
              </span>
            )}
          </div>
        </div>
        <div className="ml-2 flex grow flex-col items-end">
          <div className="relative flex w-full flex-col items-end">
            <input
              type="text"
              inputMode="decimal"
              className="w-full border-none bg-white text-end font-light outline-none text-5xl"
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              readOnly={readOnly}
            />
            {!readOnly && (
              <div className="mt-1">
                <Button
                  variant="secondary"
                  size="sm"
                  className="h-5 max-h-5 min-h-5 w-10 min-w-10 max-w-10 rounded-xl text-[11px]"
                  onClick={() => setAmount(selectedToken?.balance)}
                >
                  Max
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
