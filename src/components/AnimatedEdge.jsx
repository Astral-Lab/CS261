import { 
    BaseEdge, 
    getBezierPath
} from '@xyflow/react';

export default function AnimatedEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition
}) {
    const [edgePath] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    return (
        <>
            <BaseEdge id={id} path={edgePath} />
            <circle r="10" fill="#60a5fa">
                <animateMotion dur="1s" repeatCount="indefinite" path={edgePath} />
            </circle>
        </>
    )
}