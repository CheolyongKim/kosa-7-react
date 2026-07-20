import useFeedbackStore from "../store/feedbackStore.js";

export default function FeedbackLayer() {
  const { toast, dialog, closeToast, closeDialog } = useFeedbackStore();
  return <>{toast && <div className={`toast-message ${toast.tone}`} role="status"><span className="toast-icon">{toast.tone === "error" ? "!" : "✓"}</span><span>{toast.message}</span><button aria-label="알림 닫기" onClick={closeToast}>×</button></div>}{dialog && <div className="modal-backdrop" role="presentation"><section className="confirm-modal" role="dialog" aria-modal="true" aria-labelledby="confirm-title"><div className="modal-symbol">!</div><h2 id="confirm-title">{dialog.title}</h2><p>{dialog.description}</p><div className="modal-actions"><button className="button button-ghost" onClick={closeDialog}>취소</button><button className="button button-danger" onClick={() => { dialog.onConfirm(); closeDialog(); }}>{dialog.confirmLabel ?? "확인"}</button></div></section></div>}</>;
}
