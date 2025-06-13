import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";


export interface CardData {
    title: string;
    content: React.ReactNode;
}

export function TutorialCarousel({ slides }: { slides: CardData[] }) {

    const [page, setPage] = useState(0)
    const [direction, setDirection] = useState<1 | -1>(1)

    const [disableLeft, setDisableLeft] = useState(true)
    const [disableRight, setDisableRight] = useState(false)

    const updatePage = (newDirection: 1 | -1) => {
        if ((newDirection === -1 && disableLeft) || (newDirection === 1 && disableRight)) return;

        const newPage = page + newDirection;

        setPage(newPage);
        setDirection(newDirection);

        setDisableLeft(newPage <= 0);
        setDisableRight(newPage >= slides.length - 1);
    };

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0,
            scale: 0.8,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 300 : -300,
            opacity: 0,
            scale: 0.8,
        }),
    };

    return (
        <div className="flex flex-col items-center">
            <div className="relative flex justify-center items-center gap-10">
                <motion.button
                    initial={false}
                    aria-label="Previous"
                    onClick={() => updatePage(-1)}
                    whileTap={{ scale: 0.9 }}
                    disabled={disableLeft}
                >
                    <ArrowLeft className={disableLeft ? "text-gray-400" : ""} />
                </motion.button>
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.div
                        key={page}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="w-full min-w-xl"
                    >
                        <Card className="w-full aspect-square max-w-xl">
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold">{slides[page].title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>{slides[page].content}</p>
                            </CardContent>
                        </Card>

                    </motion.div>
                </AnimatePresence>
                <motion.button
                    initial={false}
                    aria-label="Next"
                    onClick={() => updatePage(1)}
                    whileTap={{ scale: 0.9 }}
                    disabled={disableRight}
                >
                    <ArrowRight className={disableRight ? "text-gray-400" : ""} />
                </motion.button>
            </div>
            <div className="flex flex-row mt-6 gap-2">
                {[...Array(slides.length)].map((_, i) => {
                    return (
                        <motion.div
                            className="w-[20px] h-[5px] rounded"
                            animate={{
                                backgroundColor: i === page ? "#FFFFFF" : "#D1D5DB",
                                opacity: i === page ? 1 : 0.5
                            }}
                            transition={{
                                duration: 0.3,
                                ease: "easeInOut",
                            }}
                        />
                    )
                })}
            </div>
        </div>
    );
}
