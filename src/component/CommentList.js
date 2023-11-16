import React, { useContext } from "react";
import { LoginContext } from "./LogInProvider";
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
} from "@chakra-ui/react";
import { CommentItem } from "./CommentItem";

export function CommentList({
  commentList,
  onDeleteModalOpen,
  isSubmitting,
  setIsSubmitting,
}) {
  const { hasAccess } = useContext(LoginContext);

  return (
    <Card>
      <CardHeader>
        <Heading size="md">댓글 리스트</Heading>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          {commentList.map((comment) => (
            <CommentItem
              key={comment.id}
              isSubmitting={isSubmitting}
              setIsSubmitting={setIsSubmitting}
              comment={comment}
              onDeleteModalOpen={onDeleteModalOpen}
            />
          ))}
        </Stack>
      </CardBody>
    </Card>
  );
}
