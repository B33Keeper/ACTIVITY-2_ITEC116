import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('comments')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'text' })
  content!: string;

  @Column({ type: 'int' })
  postId!: number;

  // Denormalized author username for quick display; nullable for older rows
  @Column({ type: 'varchar', length: 80, nullable: true, default: null })
  authorUsername!: string | null;

  @CreateDateColumn()
  createdAt!: Date;
}

