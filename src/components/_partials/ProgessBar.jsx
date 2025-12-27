export default function ProgessBar(props) {
  return (
    <div class="progessbar" style={{ "--progress": props.value + "px" }}>
    </div>
  );
}