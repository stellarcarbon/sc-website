import { WalletType } from "stellar-wallets-kit";

type SelectWalletButtonProps = {
  walletType: WalletType;
  isSelected: boolean;
  onClick: () => void;
};

export default function SelectWalletButton({
  walletType,
  isSelected,
  onClick,
}: SelectWalletButtonProps) {
  let WalletImages: { [key in WalletType]?: string } = {
    [WalletType.XBULL]:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxnIGNsaXAtcGF0aD0idXJsKCNjbGlwMF8zOTMzXzQyNzI0KSI+CjxjaXJjbGUgY3g9IjI1Ni4xNDQiIGN5PSIyNTYiIHI9IjI1NiIgZmlsbD0iIzIwMjAyMCIvPgo8cGF0aCBkPSJNMjA1LjU1MyAxNzEuODc1QzIxMS40MzUgMTYxLjY4NyAyMTguMjY4IDE1Ny40NDMgMjI1LjIwNiAxNTcuMDMxQzIzOS4yNzggMTU2LjEgMjcwLjc0IDE3OS4yNzEgMjYwLjc4NiAxOTMuMDNMMjc5LjQzMyAyMjUuNTZDMjkxLjM0NiAyMzUuNTQ0IDMwMy40MSAyNDMuNDA3IDMxNS43NzEgMjQ4LjYyOUMzMTMuNDYxIDI1OC4zMDIgMzE4Ljg0IDI2MS43NjkgMzI0LjI2NiAyNjUuMTgxQzMxNy4wMjkgMjUyLjUxMSAzMzEuMjAxIDI0NS40NzQgMzM4LjgzOSAyNTguMDQ1QzM0Ni43MyAyNjkuMTEyIDM0OC44NDMgMjgwLjU5NiAzNDQuMTE3IDI4OS41NDNDMzM3LjEzIDMwMi45MzkgMzE4LjM4NCAzMTIuODY3IDMwOS44ODkgMzI1LjMzM0MzMjcuMTg0IDMwOS42NjMgMzUwLjQ1IDMxMS40MjIgMzU5LjY0OSAyOTMuMjEzQzM2NS4zNzcgMjgxLjkzNyAzNTEuMDU0IDI0OC41MjcgMzQ0LjM3IDIzNy4yNTFDMzM0LjAxNSAyMTkuOTI1IDMyMS4wOTkgMjI0Ljk0MSAzMTkuNjQgMjMwLjUyOEMzMDUuOTE5IDIyMy4wMjcgMjkzLjcwNiAyMTEuMTMxIDI4MS4yNDEgMjAxLjE5OUMyODcuMDcxIDE5Ni4wODEgMjkwLjM5IDE4OC42ODQgMjg0LjAxIDE4NC43QzI3MC45NCAxNzYuNDI3IDI1NS43NjMgMTUxLjcwNCAyMzYuMDYxIDE0Ni44OTFDMjM0LjA5OSAxNDYuNDA2IDIzMi4xMDEgMTQ2LjE0MyAyMzAuMTE2IDE0Ni4xNDNDMjE5Ljg0NyAxNDYuMTQzIDIwOS44MDQgMTUzLjEwOCAyMDUuNTUzIDE3MS44NzUiIGZpbGw9IiM0RTRCNjYiLz4KPHBhdGggZD0iTTIzOS4xNzcgNDY3QzI1NC42NDggNDY3IDI2OS43MjkgNDY0LjkyMiAyODQuMDIzIDQ2MS4wNjdDMTk2LjAyNiA0ODQuNzIxIDE0Mi4yMzkgMzgzLjk3MiAyMDkuMTIyIDMxMy4xMjZDMTg0LjQ5MyAzMDYuNDU2IDE2OC42NjUgMjgxLjYyOCAxNzAuMjIgMjUxLjk5MUMzNy4zMzUxIDM0OS40MzQgMTAwLjM2MiA0NjcgMjM5LjE3NyA0NjdWNDY3Wk0yODQuMDQ5IDQ2MS4wNTlDMjg0LjE4NyA0NjEuMDIyIDI4NC4zMjMgNDYwLjk4NyAyODQuNDYxIDQ2MC45NDlDMjg0LjMyNSA0NjAuOTg0IDI4NC4xODUgNDYxLjAyNCAyODQuMDQ5IDQ2MS4wNTlaTTI4NC4wMjMgNDYxLjA2N0MyODQuMDM0IDQ2MS4wNjUgMjg0LjAzOSA0NjEuMDYyIDI4NC4wNDkgNDYxLjA1OUMyODQuMDQxIDQ2MS4wNjIgMjg0LjAzMSA0NjEuMDY1IDI4NC4wMjMgNDYxLjA2N1oiIGZpbGw9IiNDMTlDRkMiLz4KPHBhdGggZD0iTTI1NS42MDkgMTQ0Ljk3OUMyNjEuMzQzIDE0OC43MDMgMjY2LjcxOCAxNTMuNjY4IDI3MS42OTMgMTU4LjY4NEMzMTguMjg1IDE0OC40OTYgMjg4LjgzMiAxMDMuMzkyIDMxMy4wNTcgODUuNzU3M0MyODIuNDUgOTYuNDExMyAzMDEuNjk5IDE0Ni4zNzMgMjU1LjYwOSAxNDQuOTc5IiBmaWxsPSIjQzE5Q0ZDIi8+CjxwYXRoIGQ9Ik0xNzkuMzY5IDE4MS41NDdMMjA1LjU1MyAxNzEuODc0QzE5OS4xNyAxMTkuMTE3IDI3MS43NDUgOTcuNzA0MSAyNDcuMjE4IDQ1QzI0Ni4xNjMgMTA0LjY4NSAxNzMuNDg3IDEwNi4wMzEgMTc5LjM2OSAxODEuNTQ3WiIgZmlsbD0iI0MxOUNGQyIvPgo8cGF0aCBkPSJNMjQ1LjY2MSAyOTYuMDZDMjU4LjY3NiAyOTAuMDYgMjcxLjY0NCAyODEuOTM3IDI4NC42NjEgMjg1Ljc2NUMyNzAuMzg1IDI3Ni40MDYgMjUyLjg0OCAyODAuOTA1IDIzNS4xNTQgMjgyLjE0NkMyMTEuMzgzIDI4My44IDE4Ny4yNiAyODEuNzMgMTcwLjIyIDI1MS45OTFDMTc3LjQ2IDI4OS41OTMgMjEwLjk4MiAzMTIuMDQxIDI0NS42NjEgMjk2LjA2IiBmaWxsPSIjQzE5Q0ZDIi8+CjxwYXRoIGQ9Ik0yMzYuMTExIDEwNC41ODNDMjIxLjI4MiAxMjQuNDQ2IDIwMi4xMzUgMTQzLjY4NyAyMDUuNTUzIDE3MS44NzRDMjEwLjYyOCAxNDkuNDc3IDIyMy45NSAxNDMuODkxIDIzNi4wNjEgMTQ2Ljg5QzI1NS43NjMgMTUxLjcwMyAyNzAuOTQgMTc2LjQyNiAyODQuMDEgMTg0LjY5OUMyOTAuMzkgMTg4LjY4MyAyODcuMDcxIDE5Ni4wOCAyODEuMjQxIDIwMS4xOThDMjkzLjcwNiAyMTEuMTMgMzA1LjkxOSAyMjMuMDI2IDMxOS42NCAyMzAuNTI3QzMyMS4wOTkgMjI0Ljk0IDMzNC4wMTUgMjE5LjkyNCAzNDQuMzcgMjM3LjI1MUMzNTEuMDU1IDI0OC41MjcgMzY1LjM3NyAyODEuOTM2IDM1OS42NDkgMjkzLjIxMkMzNTAuNDUgMzExLjQyMSAzMjcuMTg0IDMwOS42NjIgMzA5Ljg4OSAzMjUuMzMyQzI5OS4zMzYgMzA1Ljc4MyAyNzguMjI5IDMwMC44MTUgMjU2Ljg2OCAyOTcuNjYyQzI2NS41NjQgMjkwLjk4OSAyNzQuNDA4IDI4NC45OSAyODQuNjYxIDI4NS43NjRDMjcxLjY0NCAyODEuOTM2IDI1OC42NzYgMjkwLjA1OSAyNDUuNjYxIDI5Ni4wNTlDMjEwLjk4MiAzMTIuMDQgMTc3LjQ2IDI4OS41OTMgMTcwLjIyIDI1MS45OUMxNjguNjY1IDI4MS42MjggMTg0LjQ5MyAzMDYuNDU2IDIwOS4xMjIgMzEzLjEyNkMxNDIuMTI3IDM4NC4wOSAxOTYuMjA2IDQ4NS4wNTMgMjg0LjQ2MSA0NjAuOTQ5QzM1OS43NSA0NDAuMzYyIDQxNS4yODggMzY5Ljc2MyA0MTUuMjg4IDI4NS43NjRDNDE1LjI4OCAyMTEuMjg2IDM3MS42MDkgMTQ3LjMwNiAzMDkuMTg4IDExOS40MjdDMzEyLjA1NCAxMzUuOTI2IDMxNS42NzIgMTUxLjg1NSAyODYuNzcyIDE3My42ODNDMjc3LjY3NSAxNjUuODIgMjY3LjUyMyAxNTIuNjg3IDI1NS42MSAxNDQuOTc5QzI4Mi40OTkgMTQ1LjgwNyAyODcuMTIzIDEyOS4xNTEgMjkyLjQ1MSAxMTMuMDE0QzI3NS4yODMgMTA3LjQwMyAyNTcuMzYgMTA0LjU1NCAyMzkuMzQ2IDEwNC41NTRDMjM4LjI2OCAxMDQuNTU0IDIzNy4xODkgMTA0LjU2NCAyMzYuMTExIDEwNC41ODNWMTA0LjU4M1pNMjM0Ljg1NSAxOTMuNzUzQzIzOC4xNzEgMTk0LjQyMyAyNDEuNTQgMTk3LjIxNyAyNDQuNjA2IDIwMC4zNzJDMjQ5LjU4MSAyMDUuNDkzIDI1NC4zMDcgMjA2LjM3NSAyNjAuMzM1IDIwMC45OTRMMjc5LjQzMyAyMjUuNTU5TDI2MC43ODYgMTkzLjAyOUMyNjAuNTM2IDE5NS42MTYgMjU4LjQ3NSAxOTYuMjM1IDI1NS45NjQgMTk2LjA4QzI1MS41OTMgMTk1LjgwNCAyNDYuMDc4IDE5Mi42NjcgMjQwLjI5MiAxOTIuNjY0QzIzOC40OTcgMTkyLjY2NCAyMzYuNjc2IDE5Mi45NjcgMjM0Ljg1NSAxOTMuNzUzWk0zMjQuMjY2IDI2NS4xOEMzMjcuMzMzIDI1OS44NTMgMzMxLjUwMSAyNTYuMzg3IDMzOC44MzkgMjU4LjA0NEMzMzYuMDIxIDI1My40MDMgMzMyLjMxMSAyNTEuNDM1IDMyOS4xMTcgMjUxLjQzNUMzMjMuNjU0IDI1MS40MzUgMzE5LjcgMjU3LjE4NiAzMjQuMjY2IDI2NS4xOCIgZmlsbD0iI0MxOUNGQyIvPgo8cGF0aCBkPSJNMjIyLjU0MSAxMjIuMjczQzIxMS45MzUgMTM2LjU5OCAyMDMuMTkgMTUyLjAxNiAyMDUuNTUzIDE3MS44NzZDMjEwLjYyOCAxNDkuNDc5IDIyMy45NSAxNDMuODkyIDIzNi4wNjEgMTQ2Ljg5MkMyNTUuNzYzIDE1MS43MDUgMjcwLjk0IDE3Ni40MjggMjg0LjAxIDE4NC43MDFDMjkwLjM5IDE4OC42ODUgMjg3LjA3MSAxOTYuMDgyIDI4MS4yNDEgMjAxLjJDMjkzLjcwNiAyMTEuMTMyIDMwNS45MTkgMjIzLjAyOCAzMTkuNjQgMjMwLjUyOUMzMjEuMDk5IDIyNC45NDIgMzM0LjAxNSAyMTkuOTI2IDM0NC4zNyAyMzcuMjUyQzM1MS4wNTUgMjQ4LjUyOCAzNjUuMzc3IDI4MS45MzggMzU5LjY0OSAyOTMuMjE0QzM1MC40NSAzMTEuNDIzIDMyNy4xODQgMzA5LjY2NCAzMDkuODg5IDMyNS4zMzRDMjk5LjMzNiAzMDUuNzg1IDI3OC4yMjkgMzAwLjgxNyAyNTYuODY4IDI5Ny42NjRDMjY1LjU2NCAyOTAuOTkxIDI3NC40MDggMjg0Ljk5MiAyODQuNjYxIDI4NS43NjZDMjcxLjY0NCAyODEuOTM4IDI1OC42NzYgMjkwLjA2MSAyNDUuNjYxIDI5Ni4wNjFDMjEwLjk4MiAzMTIuMDQyIDE3Ny40NiAyODkuNTk1IDE3MC4yMiAyNTEuOTkyQzE2OC42NjUgMjgxLjYzIDE4NC40OTMgMzA2LjQ1OCAyMDkuMTIyIDMxMy4xMjhDMTY1LjQ5NyAzNTkuMzE3IDE3My4xODcgNDE4LjIyOCAyMDguMjE1IDQ0Ny4wODhDMzA2LjQyNCA0NjYuOTQ4IDM5OC45MDIgMzg5LjgzMSAzOTguOTAyIDI4NS43NjZDMzk4LjkwMiAyMjEuNTI5IDM2My4xMTYgMTY1LjkyNyAzMTAuODk3IDEzOC44NzdDMzA5Ljk0MSAxNDkuMjczIDMwNC40MTMgMTYwLjM5MyAyODYuNzcyIDE3My42ODVDMjc3LjY3NSAxNjUuODIyIDI2Ny41MjMgMTUyLjY4OSAyNTUuNjEgMTQ0Ljk4MUMyNzMuNDUyIDE0NS40OTggMjgxLjU0MyAxMzguMzYyIDI4Ni40NjkgMTI4LjczN0MyNzEuMTQ0IDEyMy44NTMgMjU1LjEyMiAxMjEuNCAyMzkuMDg4IDEyMS40QzIzMy41NjUgMTIxLjQgMjI4LjA0IDEyMS42ODkgMjIyLjU0MSAxMjIuMjczIiBmaWxsPSIjMjAyMDIwIi8+CjxwYXRoIGQ9Ik0yMDkuMTIyIDMxMy4xMjZDMTQyLjEyNyAzODQuMDkgMTk2LjIwNiA0ODUuMDUzIDI4NC40NjEgNDYwLjk0OUMxODMuNDkxIDQ2NS40OTggMTkzLjQ5MSAzNDcuNDcxIDI1Ny41MjIgMzEzLjkwM0MyODAuNTQgMzE3LjExIDMwNC4yNTkgMzIxLjE5OCAzMTUuNjcyIDM0Mi4yOTdDMzMyLjkxIDMyNi42ODEgMzU2LjE3OSAzMjguMzg2IDM2NS40MjcgMzEwLjE3N0MzNjkuMTQ3IDMwMi44ODcgMzY0LjQyNCAyODYuMjg1IDM1OC44NDQgMjcyLjQxOUMzNjEuMDU1IDI4MC45NTggMzYxLjkwNyAyODguODE4IDM1OS42NDkgMjkzLjIxMkMzNTAuNDUgMzExLjQyMSAzMjcuMTg0IDMwOS42NjIgMzA5Ljg4OSAzMjUuMzMyQzI5OS4zMzYgMzA1Ljc4MyAyNzguMjI5IDMwMC44MTUgMjU2Ljg2OCAyOTcuNjYyQzI2NS41NjQgMjkwLjk5IDI3NC40MDggMjg0Ljk5IDI4NC42NjEgMjg1Ljc2NEMyNzEuNjQ0IDI4MS45MzYgMjU4LjY3NiAyOTAuMDU5IDI0NS42NjEgMjk2LjA1OUMyMTAuOTgyIDMxMi4wNCAxNzcuNDYgMjg5LjU5MyAxNzAuMjIgMjUxLjk5QzE2OC42NjUgMjgxLjYyOCAxODQuNDkzIDMwNi40NTYgMjA5LjEyMiAzMTMuMTI2IiBmaWxsPSIjMjYyMzM4Ii8+CjxwYXRoIGQ9Ik0xOTMuMTQ0IDE3Ni41TDIxMi42NDQgMTY5LjVDMjA2LjI2MiAxMTYuNzQyIDI3Ny4xMDEgMTA4LjE4MSAyNTIuMzQ1IDU5LjMwNDlDMjUyLjM0NSAxMDguMTgxIDE4NC41NTMgMTA1LjUxOCAxOTMuMTQ0IDE3Ni41WiIgZmlsbD0iIzIwMjAyMCIvPgo8L2c+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzM5MzNfNDI3MjQiPgo8cmVjdCB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgZmlsbD0id2hpdGUiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K",
    [WalletType.ALBEDO]:
      "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDIwMDEwOTA0Ly9FTiIKICJodHRwOi8vd3d3LnczLm9yZy9UUi8yMDAxL1JFQy1TVkctMjAwMTA5MDQvRFREL3N2ZzEwLmR0ZCI+CjxzdmcgdmVyc2lvbj0iMS4wIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiB3aWR0aD0iMTI4LjAwMDAwMHB0IiBoZWlnaHQ9IjEyOC4wMDAwMDBwdCIgdmlld0JveD0iMCAwIDEyOC4wMDAwMDAgMTI4LjAwMDAwMCIKIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIG1lZXQiPgoKPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4wMDAwMDAsMTI4LjAwMDAwMCkgc2NhbGUoMC4xMDAwMDAsLTAuMTAwMDAwKSIKZmlsbD0iIzAwOTJiYiIgc3Ryb2tlPSJub25lIj4KPHBhdGggZD0iTTYwOSAxMjQwIGMtMiAtMTYgLTUgLTIzIC0yNiAtNzAgLTIwIC00NCAtNTQgLTEyNiAtNjkgLTE2NSAtNCAtMTEKLTYgLTIzIC02IC0yNyAxIC01IC0zIC04IC05IC04IC01IDAgLTggLTQgLTQgLTkgMyAtNSAxIC0xMiAtNSAtMTYgLTYgLTQgLTgKLTExIC01IC0xNiA0IC01IDEgLTkgLTQgLTkgLTYgMCAtMTEgLTcgLTExIC0xNSAwIC04IC0xNiAtNDkgLTM2IC05MiAtMjAgLTQyCi0zNyAtODIgLTM4IC04OCAtMSAtNSAtMTIgLTI4IC0yMyAtNTAgLTExIC0yMiAtMjEgLTQzIC0yMiAtNDcgLTEgLTQgLTExIC0yOQotMjIgLTU1IC0xMiAtMjcgLTIyIC01NSAtMjQgLTYzIC0yIC04IC0xMiAtMzMgLTIzIC01NSAtMTEgLTIyIC0yNiAtNTggLTMzCi04MCAtOCAtMjIgLTE2IC00MiAtMjAgLTQ1IC04IC03IC03OCAtMTc3IC05MSAtMjIwIC02IC0xOSAtMTcgLTQ0IC0yNCAtNTUKLTIyIC0zMSAtMTcgLTM1IDQ5IC0zNSBsNjIgMCAxNyAzOCBjMjMgNTMgMzEgNzYgMzAgODQgLTEgNSAzIDggOCA4IDUgMCA5IDMKOSA4IC0xIDQgMCAxMCAxIDE1IDEgNCAzIDEwIDQgMTUgMSA0IDEwIDI0IDE5IDQ2IDE5IDQyIDEzIDQyIDExNyAxMSAxMTEgLTMzCjQ2NCAtMjggNDg2IDYgMyA1IDkgNyAxNCA0IDUgLTMgMjUgMSA0NCA5IGwzNiAxNSAyMSAtNDcgYzExIC0yNiAyNyAtNjUgMzUKLTg3IDggLTIyIDIxIC01MCAzMCAtNjIgOCAtMTMgMTIgLTIzIDkgLTIzIC0zIDAgLTEgLTkgNSAtMjAgOCAtMTQgMjEgLTIwIDQ2Ci0yMCBsMzYgMCAtMjIgMzUgYy0xMiAxOSAtMTkgMzUgLTE1IDM1IDMgMCAtMyAxNyAtMTMgMzggLTE4IDM0IC0zNCA2OSAtMzYKODIgLTEgMyAtOCAyMSAtMTcgNDAgLTkgMTkgLTI5IDY3IC00NCAxMDUgLTE1IDM5IC0zMyA4MSAtNDEgOTUgLTcgMTQgLTM4IDg4Ci03MCAxNjUgLTY1IDE1OSAtMTA5IDI2MiAtMTI0IDI4NyAtNSAxMCAtMTAgMjIgLTEwIDI4IDAgMTAgLTM2IDk0IC03MSAxNjMKLTEwIDIyIC0xOSA0NSAtMTkgNTMgMCA4IC01IDE0IC0xMSAxNCAtNSAwIC04IDQgLTQgOSAzIDUgMSAxMiAtNSAxNiAtNiA0IC04CjExIC01IDE2IDQgNSAxIDkgLTYgOSAtNyAwIC05IDMgLTYgNyA0IDMgMiAxMiAtNCAyMCAtMTMgMTUgLTU4IDE4IC02MCAzegptOTYgLTIzNCBjMTQgLTMwIDI1IC01OCAyNSAtNjEgMCAtNiAyNCAtNjIgNjAgLTE0MCAxMCAtMjIgMjIgLTUyIDI1IC02NyA0Ci0xNiAxMCAtMjggMTQgLTI4IDQgMCA4IC02IDggLTEyIDAgLTcgOSAtMzMgMjEgLTU4IDExIC0yNSAzMyAtNzQgNDggLTExMCAxNAotMzYgMzQgLTgzIDQ0IC0xMDUgNDEgLTkyIDQ0IC0xMDUgMjkgLTExOSAtOCAtNyAtNTkgLTIxIC0xMTQgLTMxIC0xMjQgLTIzCi0yOTIgLTIzIC0zOTUgMCAtNDEgOSAtODMgMTggLTk0IDIwIC0yOSA3IC0zMCAxMiAtMTAgNTcgMTAgMjMgMTkgNDUgMTkgNDggMQozIDE0IDMyIDMwIDY0IDE1IDMzIDI4IDY2IDI4IDczIDAgNyA0IDEzIDkgMTMgNSAwIDcgNCAzIDkgLTMgNSAtMSAxMiA1IDE2IDYKNCA4IDExIDUgMTYgLTQgNSAtMSA5IDQgOSA2IDAgMTEgNyAxMSAxNSAwIDggNCAyMyA5IDMzIDE5IDM0IDY5IDE0OCA4MiAxODcKOCAyMiAxOCA0MyAyMiA0NiA1IDMgOSAxMCA5IDE1IDAgNSA0IDE4IDkgMjkgMTIgMzIgMjAgNjAgMTkgNjQgLTEgMiAyIDcgNwoxMCA1IDMgMTQgMTggMjAgMzQgNyAxNSAxNSAyNyAxOCAyNyAzIDAgMTYgLTI0IDMwIC01NHoiLz4KPC9nPgo8L3N2Zz4K",
  };

  return (
    <img
      id={`${walletType}_SelectWalletButton`}
      onClick={onClick}
      className={`h-20 rounded-full p-3 hover:border hover:border-black cursor-pointer ${
        isSelected ? "bg-slate-400 border border-black" : "bg-white"
      } `}
      src={WalletImages[walletType]}
    />
  );
}