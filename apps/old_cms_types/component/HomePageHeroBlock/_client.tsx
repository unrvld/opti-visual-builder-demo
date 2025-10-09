"use client";

import { getFragmentData } from '@gql/fragment-masking'
import { LinkDataFragmentDoc, ReferenceDataFragmentDoc, type HomePageHeroBlockDataFragment } from '@gql/graphql'
import { type FunctionComponent } from "react"
import Button from "../ButtonBlock"
import Image from "next/image"
import { motion } from "framer-motion"
import { AnimatedText } from "@/components/partial/animatedText"

type HomeHeroBlockComponentType = FunctionComponent<{
  data: HomePageHeroBlockDataFragment
  inEditMode?: boolean
} & Omit<JSX.IntrinsicElements['section'], 'data' | 'inEditMode' | 'contentLink'>>

const HomeHero: HomeHeroBlockComponentType = ({ 
  data: { 
    homeHeroHeading: heading = "", 
    homeHeroSubheading: subheading = "", 
    homeHeroButton: button, 
    leftImage, 
    rightImage 
  }, 
  inEditMode,
  className: sectionClassName,
  ...props
}) => {
  const leftImageUrlData = getFragmentData(LinkDataFragmentDoc, getFragmentData(ReferenceDataFragmentDoc, leftImage)?.url)
  const rightImageUrlData = getFragmentData(LinkDataFragmentDoc, getFragmentData(ReferenceDataFragmentDoc, rightImage)?.url)
  const leftImageUrl = leftImageUrlData ? new URL(leftImageUrlData.default ?? '/', leftImageUrlData.base ?? 'https://example.com').href : undefined
  const rightImageUrl = rightImageUrlData ? new URL(rightImageUrlData.default ?? '/', rightImageUrlData.base ?? 'https://example.com').href : undefined

  return (
    <section className={"py-10 lg:py-20 w-full overflow-hidden relative outer-padding " + sectionClassName} {...props}>
      <div className="container mx-auto text-center flex flex-col items-center max-w-xl relative z-10 pt-8">
        {leftImageUrl && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100%)" }}
            animate={{ opacity: 1, clipPath: "circle(120% at 100%)" }}
            transition={{ duration: 1, delay: 1.25 }}
            className="absolute left-[-80%] top-20 rounded-[2rem] overflow-hidden hidden lg:block"
          >
            <Image
              data-epi-edit={inEditMode ? "HomeHeroLeftImage" : undefined}
              src={leftImageUrl}
              alt=""
              width={435}
              height={368}
            />
          </motion.div>
        )}
        <div className="mb-16 prose prose-h1:text-7xl prose-p:text-2xl prose-h1:mb-10 prose-p:leading-tight dark:!text-white">
          {inEditMode ? (
            <h1 data-epi-edit={"HomeHeroBlockHeading"}>{heading}</h1>
          ) : (
            <AnimatedText el="h1" text={heading ?? ""} />
          )}
          {inEditMode ? (
            <p data-epi-edit={"HomeHeroBlockSubHeading"}>{subheading}</p>
          ) : (
            <AnimatedText
              delay={1200}
              text={subheading ?? ""}
              animation={{
                hidden: { opacity: 0, y: 2 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.15, ease: "easeInOut" },
                },
              }}
              repeatDelay={0.005}
            />
          )}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <Button
            data-epi-edit={inEditMode ? "HomeHeroButtonBlock" : undefined}
            {...button}
          ></Button>
        </motion.div>
        {rightImageUrl && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 0%)" }}
            animate={{ opacity: 1, clipPath: "circle(120% at 0%)" }}
            transition={{ duration: 1, delay: 1.45 }}
            className="absolute right-[-80%] top-20 rounded-[2rem] overflow-hidden hidden lg:block"
          >
            <Image
              data-epi-edit={inEditMode ? "HomeHeroRightImage" : undefined}
              src={rightImageUrl}
              alt=""
              width={435}
              height={368}
            />
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default HomeHero;
