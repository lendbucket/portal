import { useGlobalStore } from "@/provider/GlobalStoreProvider";
import { api } from "@/trpc/react";
import { Button } from "@chakra-ui/react";
import React, { useCallback } from "react";
import { usePlaidLink } from "react-plaid-link";

const TransferLink = ({ 
  label, 
  isDisabled, 
  isLoading, 
  onAction 
}: { 
  label: string, 
  isDisabled: boolean, 
  isLoading: boolean, 
  onAction: (data: any) => void 
}) => {
  const { plaid, setItemId, setAccessToken, setAccountId } = useGlobalStore(
    (state: any) => state,
  )

  const exchangePublicTokenForAccessToken = api.plaid.exchangePublicTokenForAccessToken.useMutation({
    onSuccess: async (res: any) => {
      if (res.status === 'success') {
        setAccessToken(res.accessToken)
        setItemId(res.itemId)
        setAccountId(res.accountId)
        onAction(res)
      }
    },
  });

  const onSuccess = useCallback(
    (public_token: string) => {
      exchangePublicTokenForAccessToken.mutate({ publicToken: public_token, getAccountId: false })
    }, []);

  const config: Parameters<typeof usePlaidLink>[0] = {
    token: plaid.linkToken!,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);

  return (
    <Button w={'full'} colorScheme="lime" onClick={() => open()} isDisabled={!ready || isDisabled} isLoading={exchangePublicTokenForAccessToken.isPending || isLoading}>
      {label}
    </Button>
  );
};

TransferLink.displayName = "TransferLink";

export default TransferLink;
