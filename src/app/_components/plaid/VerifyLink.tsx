import { useGlobalStore } from "@/provider/GlobalStoreProvider";
import { api } from "@/trpc/react";
import { Button } from "@chakra-ui/react";
import React, { useEffect, useCallback } from "react";
import { usePlaidLink } from "react-plaid-link";

const VerifyLink = ({ 
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

  const { plaid } = useGlobalStore(
    (state: any) => state,
  )

  const updateVerifyStatus = api.plaid.updateVerifyStatus.useMutation();

  const onSuccess = useCallback(
    async (public_token: string, metadata: any) => {
      const response = await updateVerifyStatus.mutateAsync({ sessionId: metadata.link_session_id })
      onAction({
        ...response,
        sessionId: metadata.link_session_id
      })
    },
    [updateVerifyStatus, onAction]
  );

  const config: Parameters<typeof usePlaidLink>[0] = {
    token: plaid.linkToken!,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);

  return (
    <Button w={'full'} colorScheme="lime" onClick={() => open()} isDisabled={!ready || isDisabled} isLoading={updateVerifyStatus.isPending || isLoading}>
      {label}
    </Button>
  );
};

VerifyLink.displayName = "VerifyLink";

export default VerifyLink;
