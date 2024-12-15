{
  isConnected && (
    <div style={{ marginTop: 20 }} className="w-full">
      <button disabled={isSignLoading} onClick={() => signMessage()}>
        Sign message
      </button>

      <div onClick={addMAntle} className="">
        addMAntle
      </div>

      <div>
        {/* <SmartContractCheck state={state} />
        <SendMTransaction state={state} />
        <WriteTransaction state={state} /> */}
      </div>
      <div
        className="cursor-pointer p-2 rounded bg-red-200 "
        onClick={newWallet}
      >
        NewWallet
      </div>
      {isSignSuccess && <div>Signature: {signData}</div>}
      {isSignError && <div>Error signing message</div>}
    </div>
  );
}
