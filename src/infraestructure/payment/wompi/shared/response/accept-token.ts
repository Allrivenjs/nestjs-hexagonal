export interface AcceptTokenResponse {
  data: {
    presigned_acceptance: {
      acceptance_token: string;
    };
  };
}
